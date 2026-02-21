import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchProjects() {
        const { data } = await supabase
            .from('projects')
            .select('*')
            .order('sort_order', { ascending: true });

        setProjects(data || []);
        setLoading(false);
    }

    useEffect(() => { fetchProjects(); }, []);

    async function handleDelete(id, title) {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

        // Delete associated images from storage
        const { data: images } = await supabase
            .from('project_images')
            .select('storage_path')
            .eq('project_id', id);

        if (images?.length) {
            await supabase.storage
                .from('project-images')
                .remove(images.map((img) => img.storage_path));
        }

        await supabase.from('projects').delete().eq('id', id);
        fetchProjects();
    }

    async function toggleStatus(project) {
        const newStatus = project.status === 'published' ? 'draft' : 'published';
        await supabase
            .from('projects')
            .update({ status: newStatus })
            .eq('id', project.id);
        fetchProjects();
    }

    async function toggleFeatured(project) {
        await supabase
            .from('projects')
            .update({ featured: !project.featured })
            .eq('id', project.id);
        fetchProjects();
    }

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[50vh]">
                <div className="w-12 h-12 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-sans font-bold text-3xl text-black uppercase">
                        Projects<span className="text-grey">.</span>
                    </h1>
                    <p className="font-mono text-xs text-grey tracking-[0.15em] uppercase mt-2">
                        {projects.length} project{projects.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <Link
                    to="/admin/projects/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                        font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                        brutal-shadow-sm brutal-hover"
                >
                    <Plus size={14} strokeWidth={3} />
                    New Project
                </Link>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-16 brutal-border brutal-shadow bg-white">
                    <p className="font-mono text-sm text-grey tracking-[0.2em] uppercase mb-4">
                        No projects yet
                    </p>
                    <Link
                        to="/admin/projects/new"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                            font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                            brutal-shadow-sm brutal-hover"
                    >
                        <Plus size={14} strokeWidth={3} />
                        Create Your First Project
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="brutal-border bg-white flex items-center gap-4 p-4"
                        >
                            {/* Status Indicator */}
                            <button
                                onClick={() => toggleStatus(project)}
                                title={project.status === 'published' ? 'Published — click to unpublish' : 'Draft — click to publish'}
                                className="shrink-0"
                            >
                                {project.status === 'published' ? (
                                    <Eye size={18} strokeWidth={3} className="text-black" />
                                ) : (
                                    <EyeOff size={18} strokeWidth={3} className="text-grey" />
                                )}
                            </button>

                            {/* Featured Toggle */}
                            <button
                                onClick={() => toggleFeatured(project)}
                                title={project.featured ? 'Featured — click to unfeature' : 'Not featured — click to feature'}
                                className="shrink-0"
                            >
                                <Star
                                    size={18}
                                    strokeWidth={3}
                                    className={project.featured ? 'text-black fill-black' : 'text-grey'}
                                />
                            </button>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-sans font-bold text-sm text-black truncate">
                                    {project.title}
                                </h3>
                                <p className="font-mono text-[10px] text-grey tracking-[0.1em] uppercase">
                                    /{project.slug} · {project.status}
                                    {project.tags?.length ? ` · ${project.tags.join(', ')}` : ''}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <Link
                                    to={`/admin/projects/${project.id}`}
                                    className="p-2 border-[2px] border-black hover:bg-black hover:text-white
                                        transition-colors duration-200"
                                    title="Edit"
                                >
                                    <Edit size={14} strokeWidth={3} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(project.id, project.title)}
                                    className="p-2 border-[2px] border-black hover:bg-black hover:text-white
                                        transition-colors duration-200"
                                    title="Delete"
                                >
                                    <Trash2 size={14} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
