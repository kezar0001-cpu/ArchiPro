import { useEffect, useRef } from 'react';
import { Studio } from 'sanity';
import config from '../../sanity.config';

/**
 * Embedded Sanity Studio Component
 *
 * Renders the full Sanity Studio UI inside a div.
 * Mounted at the /studio route via React Router.
 */
export default function StudioPage() {
    const studioRef = useRef(null);

    // Prevent body scroll when studio is active
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            ref={studioRef}
            id="sanity-studio"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                width: '100vw',
                height: '100vh',
            }}
        >
            <Studio config={config} />
        </div>
    );
}
