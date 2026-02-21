import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, FolderOpen, Video, ArrowUpRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function DashboardPage() {
    const [stats, setStats] = useState({ projects: 0, published: 0, drafts: 0 });

    useEffect(() => {
        async function fetchStats() {
            const { count: total } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true });

            const { count: published } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'published');

            setStats({
                projects: total || 0,
                published: published || 0,
                drafts: (total || 0) - (published || 0),
            });
        }
        fetchStats();
    }, []);

    const cards = [
        {
            label: 'Total Projects',
            value: stats.projects,
            to: '/admin/projects',
            icon: FolderOpen,
        },
        {
            label: 'Published',
            value: stats.published,
            to: '/admin/projects',
            icon: ArrowUpRight,
        },
        {
            label: 'Drafts',
            value: stats.drafts,
            to: '/admin/projects',
            icon: FileText,
        },
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="font-sans font-bold text-3xl text-black uppercase">
                    Dashboard<span className="text-grey">.</span>
                </h1>
                <p className="font-mono text-xs text-grey tracking-[0.15em] uppercase mt-2">
                    Welcome back
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={card.label}
                            to={card.to}
                            className="brutal-border brutal-shadow bg-white p-6 brutal-hover block"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Icon size={20} strokeWidth={3} className="text-grey" />
                                <span className="font-sans font-bold text-4xl text-black">
                                    {card.value}
                                </span>
                            </div>
                            <p className="font-mono text-xs text-grey tracking-[0.15em] uppercase">
                                {card.label}
                            </p>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="font-sans font-bold text-xl text-black uppercase mb-4">
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        to="/admin/projects/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black brutal-shadow-sm brutal-hover"
                    >
                        New Project
                    </Link>
                    <Link
                        to="/admin/content"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black brutal-shadow-sm brutal-hover"
                    >
                        Edit Site Content
                    </Link>
                    <Link
                        to="/admin/hero-video"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black brutal-shadow-sm brutal-hover"
                    >
                        <Video size={14} strokeWidth={3} />
                        Hero Video
                    </Link>
                </div>
            </div>
        </div>
    );
}
