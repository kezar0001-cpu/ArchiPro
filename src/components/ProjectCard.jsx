import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { urlFor } from '../lib/sanity';

/**
 * ProjectCard — Neo-Brutalist Portfolio Card
 *
 * Displays a project thumbnail with:
 * - 4:3 aspect ratio
 * - 3px black border
 * - Hard shadow that collapses on hover (brutal-hover)
 * - Grayscale thumbnail (enforced by CSS filter)
 * - Tags and title overlay
 *
 * Props:
 *   - project: Sanity project document { _id, title, slug, description, thumbnail, tags }
 */
export default function ProjectCard({ project }) {
    const { title, slug, description, thumbnail, tags } = project;

    const thumbnailUrl = thumbnail
        ? urlFor(thumbnail).width(800).height(600).quality(90).url()
        : null;

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="group relative"
        >
            <a
                href={`/work/${slug.current}`}
                className="block brutal-border brutal-shadow brutal-hover bg-white overflow-hidden"
            >
                {/* Thumbnail Container (4:3 aspect ratio) */}
                <div className="aspect-[4/3] relative overflow-hidden bg-grey-light">
                    {thumbnailUrl ? (
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-grey-light">
                            <span className="font-mono text-xs text-grey tracking-[0.2em] uppercase">
                                No Image
                            </span>
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div
                        className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                        aria-hidden="true"
                    />

                    {/* Arrow Icon (appears on hover) */}
                    <div
                        className="absolute top-3 right-3 w-10 h-10 bg-white border-[3px] border-black
                            flex items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <ArrowUpRight size={20} strokeWidth={3} className="text-black" />
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-5 border-t-[3px] border-black">
                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags.slice(0, 3).map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase
                                        px-2 py-1 border-[2px] border-grey"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h3
                        className="font-sans font-bold text-xl text-black tracking-[-0.01em] mb-2
                            group-hover:text-grey transition-colors duration-300"
                    >
                        {title}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className="font-sans text-sm text-grey leading-relaxed line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>
            </a>
        </motion.article>
    );
}
