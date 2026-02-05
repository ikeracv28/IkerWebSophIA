
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export default function useScrollNavigation(nextPath, prevPath) {
    const router = useRouter();
    // Cooldown on mount to prevent instant navigation
    const onCooldown = useRef(true);
    // Block while navigating
    const isNavigating = useRef(false);
    // Intent accumulator
    const wheelAccumulator = useRef(0);
    // Edge state tracking
    const wasAtEdgeLower = useRef(false);
    const wasAtEdgeUpper = useRef(false);
    // Timestamps for "settling time" at the edges
    const edgeEntryTime = useRef(0);

    // 1. Scroll Position: ALWAYS TOP
    useEffect(() => {
        const forceScrollTop = () => {
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };

        // On mount
        forceScrollTop();
        // Backup
        setTimeout(forceScrollTop, 50);

        // On route change (extra safety)
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

    // 2. Navigation Logic (Wheel)
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

            // Strict detection
            // Use Math.ceil on scrollTop to ensure integers and compare sums
            const isStrictlyAtBottom = (scrollTop + windowHeight) >= (docHeight - 1);
            const isStrictlyAtTop = scrollTop <= 1;

            // HIGH THRESHOLD (Requires strong gesture)
            const THRESHOLD = 200;
            // VERY HIGH SAFETY DELAY (1 second)
            // Must stay at the bottom for 1 second before allowing change
            const EDGE_SAFETY_DELAY = 1000;

            const now = Date.now();

            // --- NAVIGATE DOWN (NEXT) ---
            if (nextPath && e.deltaY > 0) {
                if (isStrictlyAtBottom) {
                    if (!wasAtEdgeLower.current) {
                        // Just touched bottom
                        wasAtEdgeLower.current = true;
                        wheelAccumulator.current = 0;
                        edgeEntryTime.current = now;
                    } else {
                        // Already at bottom. Has the safety second passed?
                        if (now - edgeEntryTime.current > EDGE_SAFETY_DELAY) {
                            wheelAccumulator.current += e.deltaY;
                            if (wheelAccumulator.current > THRESHOLD) {
                                isNavigating.current = true;
                                router.push(nextPath);
                            }
                        } else {
                            // Ignore inertia
                            wheelAccumulator.current = 0;
                        }
                    }
                } else {
                    wasAtEdgeLower.current = false;
                    wheelAccumulator.current = 0;
                }
            }

            // --- NAVIGATE UP (PREV) ---
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
