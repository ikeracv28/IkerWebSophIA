import { useEffect, useRef } from 'react';

export default function useMouseTrail() {
    const canvasRef = useRef(null);
    const points = useRef([]);
    const animationRef = useRef(null);
    const lastMousePosition = useRef({ x: 0, y: 0 });
    const isFirstMove = useRef(true);

    useEffect(() => {
        // 1. Setup Canvas
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '1';
        canvas.style.mixBlendMode = 'screen';
        document.body.appendChild(canvas);
        canvasRef.current = canvas;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        // 2. Resize Handle
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // 2.5 Scroll Handle (Visibility Constraint)
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Desvanecer RÁPIDO: al bajar el 50% de la pantalla
            const threshold = window.innerHeight * 0.5;

            let opacity = 1.0 - (scrollY / threshold);
            if (opacity < 0) opacity = 0;
            if (opacity > 1) opacity = 1;

            canvas.style.opacity = opacity.toString();

            // Kill Switch: Ocultar totalmente si no es visible
            if (opacity <= 0.01) {
                canvas.style.visibility = 'hidden';
            } else {
                canvas.style.visibility = 'visible';
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init Check

        // Helper to add a diffuse point
        const addPoint = (x, y) => {
            points.current.push({
                x,
                y,
                life: 1.0,
                size: 400 // Much bigger for "wide light" effect (not a line)
            });
        };

        // 3. Mouse Tracking with Interpolation
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            if (isFirstMove.current) {
                lastMousePosition.current = { x, y };
                isFirstMove.current = false;
                addPoint(x, y);
                return;
            }

            // Calculate distance
            const dx = x - lastMousePosition.current.x;
            const dy = y - lastMousePosition.current.y;
            const distance = Math.hypot(dx, dy);

            // Interpolate points
            // Increase step slightly to reduce density/opacity buildup since we want it "lighter"
            const step = 20;

            if (distance > step) {
                const steps = Math.floor(distance / step);
                for (let i = 0; i < steps; i++) {
                    const t = i / steps;
                    const px = lastMousePosition.current.x + dx * t;
                    const py = lastMousePosition.current.y + dy * t;
                    addPoint(px, py);
                }
            }

            // Add final point
            addPoint(x, y);
            lastMousePosition.current = { x, y };

            // Performance Cap
            if (points.current.length > 200) {
                points.current = points.current.slice(points.current.length - 200);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // 4. Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Iterate points
            for (let i = 0; i < points.current.length; i++) {
                const p = points.current[i];

                // Decay - Faster fade for "shorter trail"
                p.life -= 0.16;

                if (p.life > 0) {
                    ctx.beginPath();
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                    // Very low opacity for "lighter/diffused" look
                    gradient.addColorStop(0, `rgba(93, 208, 255, ${p.life * 0.06})`);
                    gradient.addColorStop(0.5, `rgba(167, 139, 250, ${p.life * 0.02})`);
                    gradient.addColorStop(1, 'rgba(0,0,0,0)');

                    ctx.fillStyle = gradient;
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Cleanup
            points.current = points.current.filter(p => p.life > 0);

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (canvasRef.current && document.body.contains(canvasRef.current)) {
                document.body.removeChild(canvasRef.current);
            }
        };
    }, []);
}
