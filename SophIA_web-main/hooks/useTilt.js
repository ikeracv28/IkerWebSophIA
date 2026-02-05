import { useEffect } from 'react';

export default function useTilt() {
    useEffect(() => {
        // Select all tilt cards
        const cards = document.querySelectorAll('.tiltCard');

        // Helper functions
        const handleMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();

            // Calculate mouse position relative to card center
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Multipliers for rotation intensity (adjust as needed)
            const rotateX = ((y - centerY) / centerY) * -12; // Negative for natural tilt
            const rotateY = ((x - centerX) / centerX) * 12;

            // Apply transform using requestAnimationFrame for smoothness
            requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                card.style.zIndex = '10'; // Bring to front
            });
        };

        const handleLeave = (e) => {
            const card = e.currentTarget;

            requestAnimationFrame(() => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.zIndex = '1'; // Reset z-index
            });
        };

        // Attach listeners
        cards.forEach(card => {
            card.addEventListener('mousemove', handleMove);
            card.addEventListener('mouseleave', handleLeave);
            // Ensure specific CSS setup for 3D
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.1s cubic-bezier(0.03, 0.98, 0.52, 0.99)'; // Smooth but responsive
        });

        // Cleanup
        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMove);
                card.removeEventListener('mouseleave', handleLeave);
            });
        };
    }); // Run on every render if card list might change, or use dependency array if static
}
