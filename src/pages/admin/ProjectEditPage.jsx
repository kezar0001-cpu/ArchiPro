import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Upload, Trash2, GripVertical, Check } from 'lucide-react';
import { supabase, getPublicUrl } from '../../lib/supabase';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableImageItem({ image, onDelete, onAltChange, saveStatus, onMoveUp, onMoveDown, isFirst, isLast }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging ? '0 4px 20px rgba(0,0,0,0.15)' : 'none',
        zIndex: isDragging ? 10 : 'auto',
        position: 'relative',
    };

    const handleColor = saveStatus === 'saved' ? '#22c55e' : '#888';

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="border-[2px] border-black bg-white"
        >
            {/* Desktop row layout */}
            <div className="hidden md:flex items-start gap-3 p-3">
                <button
                    {...attributes}
                    {...listeners}
                    className="mt-1 shrink-0 touch-none"
                    style={{ cursor: isDragging ? 'grabbing' : 'grab', color: handleColor, transition: 'color 0.3s' }}
                    title="Drag to reorder"
                    type="button"
                >
                    <GripVertical size={16} strokeWidth={3} />
                </button>
                <img
                    src={image.url}
                    alt={image.alt_text}
                    className="w-20 h-16 object-cover grayscale border-[2px] border-black shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <input
                        type="text"
                        defaultValue={image.alt_text}
                        onBlur={(e) => onAltChange(image.id, e.target.value)}
                        className="w-full px-2 py-1 border-[2px] border-black font-mono text-[10px]
                            focus:outline-none focus:border-grey transition-colors duration-200"
                        placeholder="Alt text..."
                    />
                    <p className="font-mono text-[9px] text-grey mt-1 truncate">
                        {image.storage_path}
                    </p>
                </div>
                <button
                    onClick={() => onDelete(image)}
                    className="p-1.5 text-grey hover:text-black transition-colors duration-200 shrink-0"
                    title="Delete image"
                    type="button"
                >
                    <Trash2 size={14} strokeWidth={3} />
                </button>
            </div>

            {/* Mobile stacked layout */}
            <div className="md:hidden p-3">
                <div className="flex gap-3 mb-2">
                    <img
                        src={image.url}
                        alt={image.alt_text}
                        className="w-20 h-16 object-cover grayscale border-[2px] border-black shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <input
                            type="text"
                            defaultValue={image.alt_text}
                            onBlur={(e) => onAltChange(image.id, e.target.value)}
                            className="w-full px-2 py-1 border-[2px] border-black font-mono text-[10px]
                                focus:outline-none focus:border-grey transition-colors duration-200"
                            placeholder="Alt text..."
                            style={{ fontSize: '16px' }}
                        />
                        <p className="font-mono text-[9px] text-grey mt-1 truncate">
                            {image.storage_path}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-grey/20">
                    <button
                        onClick={onMoveUp}
                        disabled={isFirst}
                        className="flex-1 flex items-center justify-center gap-1 py-2 border-[2px] border-black font-mono text-[10px] uppercase tracking-[0.1em] disabled:opacity-30"
                        type="button"
                    >
                        ↑ Up
                    </button>
                    <button
                        onClick={onMoveDown}
                        disabled={isLast}
                        className="flex-1 flex items-center justify-center gap-1 py-2 border-[2px] border-black font-mono text-[10px] uppercase tracking-[0.1em] disabled:opacity-30"
                        type="button"
                    >
                        ↓ Down
                    </button>
                    <button
                        onClick={() => onDelete(image)}
                        className="flex items-center justify-center p-2 border-[2px] border-black text-grey hover:text-black transition-colors"
                        title="Delete image"
                        type="button"
                        style={{ minWidth: '44px', minHeight: '44px' }}
                    >
                        <Trash2 size={14} strokeWidth={3} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProjectEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = id === 'new';

    const [form, setForm] = useState({
        title: '',
        slug: '',
        description: '',
        details: '',
        tags: [],
        featured: false,
        status: 'draft',
        sort_order: 0,
    });
    const [images, setImages] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [orderSaveStatus, setOrderSaveStatus] = useState(null); // null | 'saving' | 'saved'
    const fileRef = useRef(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        if (isNew) return;

        async function fetchProject() {
            const { data: project } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();

            if (!project) {
                navigate('/admin/projects');
                return;
            }

            setForm({
                title: project.title || '',
                slug: project.slug || '',
                description: project.description || '',
                details: project.details || '',
                tags: project.tags || [],
                featured: project.featured || false,
                status: project.status || 'draft',
                sort_order: project.sort_order || 0,
            });

            const { data: imgs } = await supabase
                .from('project_images')
                .select('*')
                .eq('project_id', id)
                .order('sort_order', { ascending: true });

            setImages(
                (imgs || []).map((img) => ({
                    ...img,
                    url: getPublicUrl('project-images', img.storage_path),
                }))
            );

            setLoading(false);
        }
        fetchProject();
    }, [id, isNew, navigate]);

    function generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    function handleTitleChange(value) {
        setForm((prev) => ({
            ...prev,
            title: value,
            slug: isNew ? generateSlug(value) : prev.slug,
        }));
    }

    function addTag() {
        const tag = tagInput.trim();
        if (tag && !form.tags.includes(tag)) {
            setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
        }
        setTagInput('');
    }

    function removeTag(tag) {
        setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
    }

    async function handleSave() {
        if (!form.title || !form.slug) return;
        setSaving(true);

        if (isNew) {
            const { data, error } = await supabase
                .from('projects')
                .insert([form])
                .select()
                .single();

            if (error) {
                alert('Error creating project: ' + error.message);
                setSaving(false);
                return;
            }

            navigate(`/admin/projects/${data.id}`, { replace: true });
        } else {
            const { error } = await supabase
                .from('projects')
                .update(form)
                .eq('id', id);

            if (error) {
                alert('Error saving project: ' + error.message);
                setSaving(false);
                return;
            }
        }

        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    async function handleImageUpload(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length || isNew) return;

        setUploading(true);

        for (const file of files) {
            const ext = file.name.split('.').pop();
            const fileName = `${id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

            const { error: uploadError } = await supabase.storage
                .from('project-images')
                .upload(fileName, file);

            if (uploadError) {
                console.error('Upload error:', uploadError);
                continue;
            }

            const nextOrder = images.length;
            const { data: imgRow } = await supabase
                .from('project_images')
                .insert([{
                    project_id: id,
                    storage_path: fileName,
                    alt_text: '',
                    sort_order: nextOrder,
                }])
                .select()
                .single();

            if (imgRow) {
                setImages((prev) => [
                    ...prev,
                    { ...imgRow, url: getPublicUrl('project-images', fileName) },
                ]);
            }
        }

        setUploading(false);
        if (fileRef.current) fileRef.current.value = '';
    }

    async function handleImageDelete(image) {
        if (!confirm('Delete this image?')) return;

        await supabase.storage.from('project-images').remove([image.storage_path]);
        await supabase.from('project_images').delete().eq('id', image.id);

        setImages((prev) => prev.filter((img) => img.id !== image.id));
    }

    async function handleAltTextChange(imageId, altText) {
        setImages((prev) =>
            prev.map((img) => (img.id === imageId ? { ...img, alt_text: altText } : img))
        );
        await supabase
            .from('project_images')
            .update({ alt_text: altText })
            .eq('id', imageId);
    }

    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setImages((prev) => {
            const oldIndex = prev.findIndex((img) => img.id === active.id);
            const newIndex = prev.findIndex((img) => img.id === over.id);
            const reordered = arrayMove(prev, oldIndex, newIndex);

            // Persist new order immediately
            setOrderSaveStatus('saving');
            Promise.all(
                reordered.map((img, idx) =>
                    supabase
                        .from('project_images')
                        .update({ sort_order: idx })
                        .eq('id', img.id)
                )
            ).then(() => {
                setOrderSaveStatus('saved');
                setTimeout(() => setOrderSaveStatus(null), 1500);
            });

            return reordered;
        });
    }, []);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[50vh]">
                <div className="w-12 h-12 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 pb-24 md:pb-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/projects')}
                    className="p-2 border-[2px] border-black hover:bg-black hover:text-white
                        transition-colors duration-200"
                >
                    <ArrowLeft size={16} strokeWidth={3} />
                </button>
                <div className="flex-1">
                    <h1 className="font-sans font-bold text-3xl text-black uppercase">
                        {isNew ? 'New Project' : 'Edit Project'}<span className="text-grey">.</span>
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    {saved && (
                        <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs text-black tracking-[0.1em] uppercase">
                            <Check size={14} strokeWidth={3} /> Saved
                        </span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving || !form.title}
                        className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                            font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                            brutal-shadow-sm brutal-hover disabled:opacity-50"
                    >
                        <Save size={14} strokeWidth={3} />
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>

                {/* Mobile sticky save bar */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-[3px] border-black p-3 flex items-center gap-3">
                    {saved && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-black tracking-[0.1em] uppercase">
                            <Check size={14} strokeWidth={3} /> Saved
                        </span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving || !form.title}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-black text-white
                            font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                            disabled:opacity-50"
                    >
                        <Save size={14} strokeWidth={3} />
                        {saving ? 'Saving...' : 'Save Project'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="brutal-border bg-white p-6">
                        <label className="block font-mono text-xs text-black tracking-[0.15em] uppercase font-bold mb-3">
                            Title
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm
                                focus:outline-none focus:border-grey transition-colors duration-200"
                            placeholder="Project Title"
                        />
                    </div>

                    {/* Slug */}
                    <div className="brutal-border bg-white p-6">
                        <label className="block font-mono text-xs text-black tracking-[0.15em] uppercase font-bold mb-3">
                            Slug
                        </label>
                        <div className="flex items-center">
                            <span className="font-mono text-xs text-grey px-3">/work/</span>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                                className="flex-1 px-4 py-3 border-[3px] border-black font-mono text-sm
                                    focus:outline-none focus:border-grey transition-colors duration-200"
                                placeholder="project-slug"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="brutal-border bg-white p-6">
                        <label className="block font-mono text-xs text-black tracking-[0.15em] uppercase font-bold mb-3">
                            Description
                        </label>
                        <p className="font-mono text-[10px] text-grey tracking-[0.1em] mb-3">
                            Short description shown on project cards
                        </p>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm
                                focus:outline-none focus:border-grey transition-colors duration-200 resize-y"
                            placeholder="Brief project overview..."
                        />
                    </div>

                    {/* Details */}
                    <div className="brutal-border bg-white p-6">
                        <label className="block font-mono text-xs text-black tracking-[0.15em] uppercase font-bold mb-3">
                            Details
                        </label>
                        <p className="font-mono text-[10px] text-grey tracking-[0.1em] mb-3">
                            Full project details (supports Markdown)
                        </p>
                        <textarea
                            value={form.details}
                            onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
                            rows={10}
                            className="w-full px-4 py-3 border-[3px] border-black font-mono text-sm
                                focus:outline-none focus:border-grey transition-colors duration-200 resize-y"
                            placeholder="# Project Details&#10;&#10;Describe the project in detail..."
                        />
                    </div>

                    {/* Images */}
                    {!isNew && (
                        <div className="brutal-border bg-white p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <label className="font-mono text-xs text-black tracking-[0.15em] uppercase font-bold">
                                        Images ({images.length})
                                    </label>
                                    {orderSaveStatus === 'saving' && (
                                        <span className="font-mono text-[10px] text-grey tracking-[0.1em] uppercase">Saving order...</span>
                                    )}
                                    {orderSaveStatus === 'saved' && (
                                        <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: '#22c55e' }}>
                                            <Check size={10} strokeWidth={3} /> Order saved
                                        </span>
                                    )}
                                </div>
                                <label
                                    className={`inline-flex items-center gap-2 px-4 py-2 bg-black text-white
                                        font-mono text-[10px] tracking-[0.1em] uppercase border-[2px] border-black
                                        cursor-pointer hover:bg-grey transition-colors duration-200
                                        ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <Upload size={12} strokeWidth={3} />
                                    {uploading ? 'Uploading...' : 'Add Images'}
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {images.length === 0 ? (
                                <div className="py-8 text-center border-[3px] border-dashed border-grey">
                                    <p className="font-mono text-xs text-grey tracking-[0.15em] uppercase">
                                        No images yet — upload some above
                                    </p>
                                </div>
                            ) : (
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext
                                        items={images.map((img) => img.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        <div className="space-y-3">
                                            {images.map((image, idx) => (
                                                <SortableImageItem
                                                    key={image.id}
                                                    image={image}
                                                    onDelete={handleImageDelete}
                                                    onAltChange={handleAltTextChange}
                                                    saveStatus={orderSaveStatus}
                                                    isFirst={idx === 0}
                                                    isLast={idx === images.length - 1}
                                                    onMoveUp={() => {
                                                        if (idx === 0) return;
                                                        setImages(prev => {
                                                            const reordered = arrayMove(prev, idx, idx - 1);
                                                            setOrderSaveStatus('saving');
                                                            Promise.all(reordered.map((img, i) =>
                                                                supabase.from('project_images').update({ sort_order: i }).eq('id', img.id)
                                                            )).then(() => { setOrderSaveStatus('saved'); setTimeout(() => setOrderSaveStatus(null), 1500); });
                                                            return reordered;
                                                        });
                                                    }}
                                                    onMoveDown={() => {
                                                        if (idx === images.length - 1) return;
                                                        setImages(prev => {
                                                            const reordered = arrayMove(prev, idx, idx + 1);
                                                            setOrderSaveStatus('saving');
                                                            Promise.all(reordered.map((img, i) =>
                                                                supabase.from('project_images').update({ sort_order: i }).eq('id', img.id)
                                                            )).then(() => { setOrderSaveStatus('saved'); setTimeout(() => setOrderSaveStatus(null), 1500); });
                                                            return reordered;
                                                        });
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            )}
                        </div>
                    )}

                    {isNew && (
                        <div className="brutal-border bg-grey-light p-6 text-center">
                            <p className="font-mono text-xs text-grey tracking-[0.15em] uppercase">
                                Save the project first, then you can add images
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="brutal-border bg-white p-6">
                        <label className="block font-mono text-xs text-black tracking-[0.15em] uppercase font-bold mb-3">
                            Status
                        </label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                            className="w-full px-4 py-3 border-[3px] border-black font-mono text-sm
                                focus:outline-none focus:border-grey transition-colors duration-200
                                bg-white appearance-none cursor-pointer"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    {/* Featured */}
                    <div className="brutal-border bg-white p-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.featured}
                                onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                                className="w-5 h-5 border-[3px] border-black appearance-none checked:bg-black cursor-pointer"
                            />
                            <span className="font-mono text-xs text-black tracking-[0.15em] uppercase font-bold">
                                Featured Project
                            </span>
                        </label>
                        <p className="font-mono text-[10px] text-grey mt-2">
                            Featured projects appear on the homepage
                        </p>
                    </div>

                    {/* Sort Order */}
                    <div className="brutal-border bg-white p-6">
                        <label className="block font-mono text-xs text-black tracking-[0.15em] uppercase font-bold mb-3">
                            Sort Order
                        </label>
                        <input
                            type="number"
                            value={form.sort_order}
                            onChange={(e) => setForm((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                            className="w-full px-4 py-3 border-[3px] border-black font-mono text-sm
                                focus:outline-none focus:border-grey transition-colors duration-200"
                        />
                        <p className="font-mono text-[10px] text-grey mt-2">
                            Lower numbers appear first
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="brutal-border bg-white p-6">
                        <label className="block font-mono text-xs text-black tracking-[0.15em] uppercase font-bold mb-3">
                            Tags
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                className="flex-1 px-3 py-2 border-[3px] border-black font-mono text-xs
                                    focus:outline-none focus:border-grey transition-colors duration-200"
                                placeholder="Add tag..."
                            />
                            <button
                                onClick={addTag}
                                className="px-3 py-2 bg-black text-white font-mono text-xs border-[3px] border-black
                                    hover:bg-grey transition-colors duration-200"
                            >
                                Add
                            </button>
                        </div>
                        {form.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {form.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-grey-light
                                            font-mono text-[10px] text-black tracking-[0.1em] uppercase
                                            border-[2px] border-black"
                                    >
                                        {tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="hover:text-grey transition-colors ml-1"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
