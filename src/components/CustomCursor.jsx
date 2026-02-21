import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * CustomCursor — Minimal hollow circle that follows the mouse with lerp lag.
 * Expands to 50px on hovering links/buttons (via CSS .expanded class).
 * Hidden on touch devices via CSS media query.
 * Rendered via portal to document.body to avoid stacking context issues.
 */
export default function CustomCursor() {
    const cursorRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const raf = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Check for touch device
        const isTouch = window.matchMedia('(hover: none)').matches;
        if (isTouch) {
            cursor.style.display = 'none';
            return;
        }

        function onMouseMove(e) {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
        }

        function onMouseOver(e) {
            const el = e.target.closest('a, button, [role="button"], input, textarea, select');
            if (el) {
                cursor.classList.add('expanded');
            }
        }

        function onMouseOut(e) {
            const el = e.target.closest('a, button, [role="button"], input, textarea, select');
            if (el) {
                cursor.classList.remove('expanded');
            }
        }

        function lerp(a, b, t) {
            return a + (b - a) * t;
        }

        function animate() {
            pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
            pos.current.y = lerp(pos.current.y, target.current.y, 0.15);
            cursor.style.left = pos.current.x + 'px';
            cursor.style.top = pos.current.y + 'px';
            raf.current = requestAnimationFrame(animate);
        }

        // Initialize position off-screen
        pos.current = { x: -100, y: -100 };
        target.current = { x: -100, y: -100 };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);
        raf.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, []);

    return createPortal(
        <div ref={cursorRef} className="custom-cursor" />,
        document.body
    );
}
