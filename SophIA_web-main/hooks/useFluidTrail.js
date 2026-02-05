import { useEffect, useRef } from 'react';

export default function useFluidTrail() {
    const canvasRef = useRef(null);

    useEffect(() => {
        // --- 1. CONFIG & SETUP ---
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw'; // Usar viewport width
        canvas.style.height = '100vh'; // Usar viewport height
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0'; // Detrás del contenido pero visible
        // Eliminado mixBlendMode 'screen' para evitar el efecto de "luz brillante"
        // canvas.style.mixBlendMode = 'screen'; 
        document.body.appendChild(canvas);
        canvasRef.current = canvas;

        const gl = canvas.getContext('webgl2', { alpha: true, depth: false, antialias: false });
        if (!gl) return; // Fallback si no hay WebGL2

        // Configuración de la simulación
        const config = {
            SIM_RESOLUTION: 128, // Resolución de la textura de simulación
            DYE_RESOLUTION: 1024, // Resolución visual
            DENSITY_DISSIPATION: 0.96, // Desvanecimiento para evitar acumulación excesiva
            VELOCITY_DISSIPATION: 0.98, // Inercia alta
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: 20,
            CURL: 40, // Remolinos suaves
            SPLAT_RADIUS: 0.8, // Radio MASIVO para mover "el ambiente" y no pintar puntos
            SPLAT_FORCE: 6000
        };

        // Extensión para texturas flotantes (necesaria para física precisa)
        gl.getExtension('EXT_color_buffer_float');

        // --- 2. SHADERS (GLSL) ---

        const baseVertexShader = `#version 300 es
            in vec2 aPosition;
            out vec2 vUv;
            out vec2 vL;
            out vec2 vR;
            out vec2 vT;
            out vec2 vB;
            uniform vec2 texelSize;
            void main () {
                vUv = aPosition * 0.5 + 0.5;
                vL = vUv - vec2(texelSize.x, 0.0);
                vR = vUv + vec2(texelSize.x, 0.0);
                vT = vUv + vec2(0.0, texelSize.y);
                vB = vUv - vec2(0.0, texelSize.y);
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;

        const displayShaderSource = `#version 300 es
            precision highp float;
            in vec2 vUv;
            uniform sampler2D uTexture;
            out vec4 outColor;
            void main () {
                vec3 C = texture(uTexture, vUv).rgb;
                float a = max(C.r, max(C.g, C.b));
                outColor = vec4(C, a);
            }
        `;

        const splatShaderSource = `#version 300 es
            precision highp float;
            in vec2 vUv;
            uniform sampler2D uTarget;
            uniform float aspectRatio;
            uniform vec3 color;
            uniform vec2 point;
            uniform float radius;
            out vec4 outColor;
            void main () {
                vec2 p = vUv - point.xy;
                p.x *= aspectRatio;
                vec3 splat = exp(-dot(p, p) / radius) * color;
                vec3 base = texture(uTarget, vUv).xyz;
                outColor = vec4(base + splat, 1.0);
            }
        `;

        const advectionShaderSource = `#version 300 es
            precision highp float;
            in vec2 vUv;
            uniform sampler2D uVelocity;
            uniform sampler2D uSource;
            uniform vec2 texelSize;
            uniform float dt;
            uniform float dissipation;
            out vec4 outColor;
            void main () {
                vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
                vec4 result = texture(uSource, coord);
                float decay = 1.0 + dissipation * dt;
                outColor = result * dissipation;
            }
        `;

        const divergenceShaderSource = `#version 300 es
            precision highp float;
            in vec2 vUv;
            in vec2 vL;
            in vec2 vR;
            in vec2 vT;
            in vec2 vB;
            uniform sampler2D uVelocity;
            out vec4 outColor;
            void main () {
                float L = texture(uVelocity, vL).x;
                float R = texture(uVelocity, vR).x;
                float T = texture(uVelocity, vT).y;
                float B = texture(uVelocity, vB).y;
                vec2 C = texture(uVelocity, vUv).xy;
                if (vL.x < 0.0) { L = -C.x; }
                if (vR.x > 1.0) { R = -C.x; }
                if (vT.y > 1.0) { T = -C.y; }
                if (vB.y < 0.0) { B = -C.y; }
                float div = 0.5 * (R - L + T - B);
                outColor = vec4(div, 0.0, 0.0, 1.0);
            }
        `;

        const curlShaderSource = `#version 300 es
            precision highp float;
            in vec2 vUv;
            in vec2 vL;
            in vec2 vR;
            in vec2 vT;
            in vec2 vB;
            uniform sampler2D uVelocity;
            out vec4 outColor;
            void main () {
                float L = texture(uVelocity, vL).y;
                float R = texture(uVelocity, vR).y;
                float T = texture(uVelocity, vT).x;
                float B = texture(uVelocity, vB).x;
                float vorticity = R - L - T + B;
                outColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
            }
        `;

        const vorticityShaderSource = `#version 300 es
            precision highp float;
            in vec2 vUv;
            in vec2 vL;
            in vec2 vR;
            in vec2 vT;
            in vec2 vB;
            uniform sampler2D uVelocity;
            uniform sampler2D uCurl;
            uniform float curl;
            uniform float dt;
            out vec4 outColor;
            void main () {
                float L = texture(uCurl, vL).x;
                float R = texture(uCurl, vR).x;
                float T = texture(uCurl, vT).x;
                float B = texture(uCurl, vB).x;
                float C = texture(uCurl, vUv).x;
                vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
                force /= length(force) + 0.0001;
                force *= curl * C;
                force.y *= -1.0;
                vec2 vel = texture(uVelocity, vUv).xy;
                outColor = vec4(vel + force * dt, 0.0, 1.0);
            }
        `;

        const pressureShaderSource = `#version 300 es
            precision highp float;
            in vec2 vUv;
            in vec2 vL;
            in vec2 vR;
            in vec2 vT;
            in vec2 vB;
            uniform sampler2D uPressure;
            uniform sampler2D uDivergence;
            out vec4 outColor;
            void main () {
                float L = texture(uPressure, vL).x;
                float R = texture(uPressure, vR).x;
                float T = texture(uPressure, vT).x;
                float B = texture(uPressure, vB).x;
                float C = texture(uPressure, vUv).x;
                float divergence = texture(uDivergence, vUv).x;
                float pressure = (L + R + B + T - divergence) * 0.25;
                outColor = vec4(pressure, 0.0, 0.0, 1.0);
            }
        `;

        const gradientSubtractShaderSource = `#version 300 es
            precision highp float;
            in vec2 vUv;
            in vec2 vL;
            in vec2 vR;
            in vec2 vT;
            in vec2 vB;
            uniform sampler2D uPressure;
            uniform sampler2D uVelocity;
            out vec4 outColor;
            void main () {
                float L = texture(uPressure, vL).x;
                float R = texture(uPressure, vR).x;
                float T = texture(uPressure, vT).x;
                float B = texture(uPressure, vB).x;
                vec2 velocity = texture(uVelocity, vUv).xy;
                velocity.xy -= vec2(R - L, T - B);
                outColor = vec4(velocity, 0.0, 1.0);
            }
        `;

        // --- 3. PROGRAM HELPERS ---

        function createProgram(vertexShader, fragmentShader) {
            const program = gl.createProgram();
            const vs = createShader(vertexShader, gl.VERTEX_SHADER);
            const fs = createShader(fragmentShader, gl.FRAGMENT_SHADER);
            if (!vs || !fs) return null;
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(program));
                return null;
            }
            return program;
        }

        function createShader(source, type) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        }

        // --- 4. TEXTURE MANAGEMENT ---

        let simWidth, simHeight, dyeWidth, dyeHeight;
        let density, velocity, divergence, curl, pressure;

        function initFramebuffers() {
            simWidth = config.SIM_RESOLUTION;
            simHeight = config.SIM_RESOLUTION;
            dyeWidth = config.DYE_RESOLUTION;
            dyeHeight = config.DYE_RESOLUTION;

            const texType = gl.HALF_FLOAT; // o gl.FLOAT si está disponible

            density = createDoubleFBO(dyeWidth, dyeHeight, texType);
            velocity = createDoubleFBO(simWidth, simHeight, texType);
            divergence = createFBO(simWidth, simHeight, texType);
            curl = createFBO(simWidth, simHeight, texType);
            pressure = createDoubleFBO(simWidth, simHeight, texType);
        }

        function createFBO(w, h, type) {
            gl.activeTexture(gl.TEXTURE0);
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, type, null);

            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            gl.viewport(0, 0, w, h);
            gl.clear(gl.COLOR_BUFFER_BIT);

            return { fbo, texture, width: w, height: h };
        }

        function createDoubleFBO(w, h, type) {
            let fbo1 = createFBO(w, h, type);
            let fbo2 = createFBO(w, h, type);
            return {
                get read() { return fbo1; },
                get write() { return fbo2; },
                swap() { let temp = fbo1; fbo1 = fbo2; fbo2 = temp; }
            };
        }

        // --- 5. RENDER LOOP & LOGIC ---

        const programs = {
            splat: createProgram(baseVertexShader, splatShaderSource),
            advection: createProgram(baseVertexShader, advectionShaderSource),
            divergence: createProgram(baseVertexShader, divergenceShaderSource),
            curl: createProgram(baseVertexShader, curlShaderSource),
            vorticity: createProgram(baseVertexShader, vorticityShaderSource),
            pressure: createProgram(baseVertexShader, pressureShaderSource),
            gradientSubtract: createProgram(baseVertexShader, gradientSubtractShaderSource),
            display: createProgram(baseVertexShader, displayShaderSource)
        };

        const blit = (() => {
            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            return (destination) => {
                gl.bindFramebuffer(gl.FRAMEBUFFER, destination ? destination.fbo : null);
                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
            };
        })();

        initFramebuffers();

        let lastTime = Date.now();
        const pointers = [];

        let isVisible = true;

        function updateKeywords() {
            if (!isVisible) {
                requestAnimationFrame(updateKeywords);
                return;
            }

            const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
            lastTime = Date.now();

            gl.viewport(0, 0, simWidth, simHeight);

            // 1. Advect Velocity
            gl.useProgram(programs.advection);
            gl.uniform2f(gl.getUniformLocation(programs.advection, "texelSize"), 1.0 / simWidth, 1.0 / simHeight);
            gl.uniform1f(gl.getUniformLocation(programs.advection, "dt"), dt);
            gl.uniform1f(gl.getUniformLocation(programs.advection, "dissipation"), config.VELOCITY_DISSIPATION);

            gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            gl.uniform1i(gl.getUniformLocation(programs.advection, "uVelocity"), 0);
            gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            gl.uniform1i(gl.getUniformLocation(programs.advection, "uSource"), 1);

            blit(velocity.write);
            velocity.swap();

            // 2. Advect Dye (Density)
            gl.viewport(0, 0, dyeWidth, dyeHeight);
            gl.uniform1f(gl.getUniformLocation(programs.advection, "dissipation"), config.DENSITY_DISSIPATION);
            gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, density.read.texture);

            blit(density.write);
            density.swap();

            // 3. User Input (Splat)
            for (let i = 0; i < pointers.length; i++) {
                const p = pointers[i];
                if (p.moved) {
                    // Splat Velocity
                    gl.viewport(0, 0, simWidth, simHeight);
                    gl.useProgram(programs.splat);
                    gl.uniform1i(gl.getUniformLocation(programs.splat, "uTarget"), 0);
                    gl.uniform1f(gl.getUniformLocation(programs.splat, "aspectRatio"), canvas.width / canvas.height);
                    gl.uniform2f(gl.getUniformLocation(programs.splat, "point"), p.x, 1.0 - p.y);
                    gl.uniform3f(gl.getUniformLocation(programs.splat, "color"), p.dx, -p.dy, 1.0);
                    gl.uniform1f(gl.getUniformLocation(programs.splat, "radius"), config.SPLAT_RADIUS / 100.0);

                    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
                    blit(velocity.write);
                    velocity.swap();

                    // Splat Dye (Color)
                    gl.viewport(0, 0, dyeWidth, dyeHeight);
                    // BRAND COLORS: Alternar entre Cyan (#5dd0ff) y Purple (#a78bfa)
                    // Normalizados: 
                    // #5dd0ff => (0.36, 0.81, 1.0)
                    // #a78bfa => (0.65, 0.54, 0.98)
                    const color = Math.random() > 0.5
                        ? [0.36, 0.81, 1.0]
                        : [0.65, 0.54, 0.98];

                    // Brillo extra 
                    const intensity = 0.2; // Muy sutil, solo para dar "color" al movimiento
                    gl.uniform3f(gl.getUniformLocation(programs.splat, "color"), color[0] * intensity, color[1] * intensity, color[2] * intensity);

                    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
                    blit(density.write);
                    density.swap();

                    p.moved = false;
                }
            }

            // 4. Curl & Vorticity (Remolinos)
            gl.viewport(0, 0, simWidth, simHeight);
            gl.useProgram(programs.curl);
            gl.uniform2f(gl.getUniformLocation(programs.curl, "texelSize"), 1.0 / simWidth, 1.0 / simHeight);
            gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(curl);

            gl.useProgram(programs.vorticity);
            gl.uniform2f(gl.getUniformLocation(programs.vorticity, "texelSize"), 1.0 / simWidth, 1.0 / simHeight);
            gl.uniform1f(gl.getUniformLocation(programs.vorticity, "dt"), dt);
            gl.uniform1f(gl.getUniformLocation(programs.vorticity, "curl"), config.CURL);
            gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, curl.texture);
            blit(velocity.write);
            velocity.swap();

            // 5. Divergence
            gl.useProgram(programs.divergence);
            gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(divergence);

            // 6. Pressure (Jacobi Iteration)
            gl.useProgram(programs.pressure);
            gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, divergence.texture);

            // Clear pressure
            gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
            // ... (podríamos limpiar pressure aquí pero normalmente se reusa)

            for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
                gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
                blit(pressure.write);
                pressure.swap();
            }

            // 7. Gradient Subtract
            gl.useProgram(programs.gradientSubtract);
            gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
            gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(velocity.write);
            velocity.swap();

            // 8. Render to Screen
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.useProgram(programs.display);
            gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
            blit(null); // Null = Screen

            requestAnimationFrame(updateKeywords);
        }

        updateKeywords();

        // --- 6. INPUT HANDLING ---

        let lastMouse = { x: 0, y: 0 };

        window.addEventListener('mousemove', e => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Interpolación para evitar "puntitos" (Dibuja varios splats entre el frame anterior y el actual)
            // Si el mouse se mueve muy rápido, llenamos el hueco

            // Buscar pointer existente o crear uno
            let p = pointers[0];
            if (!p) {
                p = { x, y, dx: 0, dy: 0, moved: false };
                pointers.push(p);
                lastMouse = { x, y };
                return;
            }

            p.dx = (e.clientX - lastMouse.x * window.innerWidth) * 5.0;
            p.dy = (e.clientY - lastMouse.y * window.innerHeight) * 5.0;
            p.x = x;
            p.y = y;
            p.moved = true;

            lastMouse = { x, y };
        });

        // Resize & Scroll Handling
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Actualizar resolución interna si es necesario, pero resize del canvas basta
        };

        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Desvanecer MUY RÁPIDO: al bajar el 40% de la pantalla ya empieza a irse
            // Al 50% fuera totalmente. Garantizado solo en Hero.
            const threshold = window.innerHeight * 0.5;

            let opacity = 1.0 - (scrollY / threshold);
            if (opacity < 0) opacity = 0;
            if (opacity > 1) opacity = 1;

            canvas.style.opacity = opacity.toString();

            // Optimización y Garantía de "No ver": Ocultar y pausar
            if (opacity <= 0.01) {
                canvas.style.visibility = 'hidden';
                isVisible = false;
            } else {
                canvas.style.visibility = 'visible';
                isVisible = true;
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init Check

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            if (canvasRef.current && document.body.contains(canvasRef.current)) {
                document.body.removeChild(canvasRef.current);
            }
        };
    }, []);
}
