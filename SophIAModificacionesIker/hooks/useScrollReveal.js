import { useEffect } from 'react';
import styles from '../styles/Home.module.css'; // Assuming we need to reference class names if strictly scoped, but usually we just toggle classes on DOM elements.

export default function useScrollReveal() {
    useEffect(() => {
        // Check if IntersectionObserver is available
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.revealVisible);
                    // Optional: Unobserve after revealing if we only want it to happen once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll(`.${styles.reveal}, .${styles.revealFade}, .${styles.revealScale}, .${styles.revealBlur}`);
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }); // Run on every render to catch new elements? Or better to strictly scope. 
    // For Next.js page transitions, usually [] is fine if components define their revlea classes on mount.
    // But we might want to use a specific ref-based approach for more React-y control. 
    // However, for a "global" script effect on existing CSS classes, this works well.
}
