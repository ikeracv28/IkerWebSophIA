
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function useScrollNavigation(nextPath, prevPath) {
    const router = useRouter();
    // Cooldown al montar para evitar navegación instantánea
    const onCooldown = useRef(true);
    // Bloqueo mientras se realiza la navegación
    const isNavigating = useRef(false);
    // Acumulador de intención
    const wheelAccumulator = useRef(0);
    // Para estado de bordes
    const wasAtEdgeLower = useRef(false);
    const wasAtEdgeUpper = useRef(false);
    // Timestamps para "tiempo de asentamiento" en los bordes
    const edgeEntryTime = useRef(0);

    // 1. Posición de Scroll: SIEMPRE ARRIBA
    useEffect(() => {
        const forceScrollTop = () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

        // Al montar
        forceScrollTop();
        // Backup
        setTimeout(forceScrollTop, 50);

        // Al cambiar de ruta (seguridad extra)
        const handleRouteChange = () => {
            forceScrollTop();
        };
        router.events.on('routeChangeComplete', handleRouteChange);

        const timer = setTimeout(() => {
            onCooldown.current = false;
        }, 1000);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
            clearTimeout(timer);
        };
    }, [router]);

    // 2. Lógica de Navegación (Wheel)
    useEffect(() => {
        wheelAccumulator.current = 0;
        isNavigating.current = false;
        wasAtEdgeLower.current = false;
        wasAtEdgeUpper.current = false;
        edgeEntryTime.current = 0;

        if (!nextPath && !prevPath) return;

        const handleWheel = (e) => {
            if (isNavigating.current || onCooldown.current) return;

            const scrollTop = Math.ceil(window.scrollY || window.pageYOffset);
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Detección estricta 
            // Usamos Math.ceil en scrollTop para asegurar enteros y comparamos sumas
            const isStrictlyAtBottom = (scrollTop + windowHeight) >= (docHeight - 1);
            const isStrictlyAtTop = scrollTop <= 1;

            // UMBRAL ALTO (Requiere gesto fuerte)
            const THRESHOLD = 200;
            // TIEMPO DE SEGURIDAD MUY ALTO (1 segundo)
            // Hay que estar 1 segundo parado en el fondo antes de poder cambiar
            const EDGE_SAFETY_DELAY = 1000;

            const now = Date.now();

            // --- NAVEGAR ABAJO (NEXT) ---
            if (nextPath && e.deltaY > 0) {
                if (isStrictlyAtBottom) {
                    if (!wasAtEdgeLower.current) {
                        // Acabamos de tocar fondo
                        wasAtEdgeLower.current = true;
                        wheelAccumulator.current = 0;
                        edgeEntryTime.current = now;
                    } else {
                        // Ya estamos en el fondo. ¿Ha pasado el segundo de seguridad?
                        if (now - edgeEntryTime.current > EDGE_SAFETY_DELAY) {
                            wheelAccumulator.current += e.deltaY;
                            if (wheelAccumulator.current > THRESHOLD) {
                                isNavigating.current = true;
                                router.push(nextPath);
                            }
                        } else {
                            // Ignorar inercia
                            wheelAccumulator.current = 0;
                        }
                    }
                } else {
                    wasAtEdgeLower.current = false;
                    wheelAccumulator.current = 0;
                }
            }

            // --- NAVEGAR ARRIBA (PREV) ---
            else if (prevPath && e.deltaY < 0) {
                if (isStrictlyAtTop) {
                    if (!wasAtEdgeUpper.current) {
                        wasAtEdgeUpper.current = true;
                        wheelAccumulator.current = 0;
                        edgeEntryTime.current = now;
                    } else {
                        if (now - edgeEntryTime.current > EDGE_SAFETY_DELAY) {
                            wheelAccumulator.current += e.deltaY;
                            if (wheelAccumulator.current < -THRESHOLD) {
                                isNavigating.current = true;
                                router.push(prevPath);
                            }
                        } else {
                            wheelAccumulator.current = 0;
                        }
                    }
                } else {
                    wasAtEdgeUpper.current = false;
                    wheelAccumulator.current = 0;
                }
            } else {
                wheelAccumulator.current = 0;
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [nextPath, prevPath, router]);
}
