import { ArrowUpRight } from 'lucide-react';

/**
 * Button — Unified button component
 *
 * Variants:
 * - primary: Filled black button on light bg, white on dark bg
 * - secondary: Bordered button
 * - ghost: Text-only with hover underline
 *
 * Props:
 * - href: If provided, renders as <a>, otherwise <button>
 * - variant: 'primary' | 'secondary' | 'ghost' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - children: Button text
 * - icon: Boolean to show arrow icon (default: false)
 * - dark: Boolean for dark background context (default: false)
 */

export default function Button({
    href,
    variant = 'primary',
    size = 'md',
    children,
    icon = false,
    dark = false,
    className = '',
    ...props
}) {
    const baseClasses = 'inline-flex items-center gap-2 font-mono uppercase tracking-[0.15em] transition-all duration-300 focus-visible:outline-offset-2';

    const sizeClasses = {
        sm: 'px-4 py-2 text-xs min-h-[44px]',
        md: 'px-6 py-3 text-xs min-h-[44px]',
        lg: 'px-10 py-5 text-sm min-h-[56px]',
    };

    const variantClasses = {
        primary: dark
            ? 'bg-white text-black border-[3px] border-white brutal-shadow-sm hover:bg-grey-light hover:border-grey-light'
            : 'bg-black text-white border-[3px] border-black brutal-shadow-sm hover:bg-grey hover:border-grey',
        secondary: 'border-[3px] border-black text-black bg-transparent brutal-shadow-sm hover:bg-black hover:text-white',
        ghost: 'bg-transparent text-black border-0 p-0 hover:opacity-60',
    };

    const Element = href ? 'a' : 'button';
    const elementProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <Element
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            {...elementProps}
            {...props}
        >
            {children}
            {icon && <ArrowUpRight size={size === 'lg' ? 18 : 14} strokeWidth={3} />}
        </Element>
    );
}
