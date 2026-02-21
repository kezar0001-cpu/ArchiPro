import { useEffect } from 'react';

/**
 * useReveal — Intersection Observer hook that adds .revealed to .reveal elements.
 * Call once at the top level of any page/component that uses .reveal classes.
 */
export default function useReveal() {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal:not(.revealed)');
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '-40px' }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);
}
