import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Check, FileText, Image } from 'lucide-react';
import { supabase, getPublicUrl } from '../../lib/supabase';

export default function ResumePage() {
    const [cvPath, setCvPath] = useState('');
    const [cvUrl, setCvUrl] = useState(null);
    const [photoPath, setPhotoPath] = useState('');
    const [photoUrl, setPhotoUrl] = useState(null);
    const [uploadingCv, setUploadingCv] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [savedCv, setSavedCv] = useState(false);
    const [savedPhoto, setSavedPhoto] = useState(false);
    const cvRef = useRef(null);
    const photoRef = useRef(null);

    useEffect(() => {
        async function fetchPaths() {
            const { data } = await supabase
                .from('site_content')
                .select('key, value')
                .in('key', ['resume_file_path', 'profile_photo_path']);

            if (data) {
                data.forEach((row) => {
                    if (row.key === 'resume_file_path' && row.value) {
                        setCvPath(row.value);
                        setCvUrl(getPublicUrl('resume-documents', row.value));
                    }
                    if (row.key === 'profile_photo_path' && row.value) {
                        setPhotoPath(row.value);
                        setPhotoUrl(getPublicUrl('profile-photo', row.value));
                    }
                });
            }
        }
        fetchPaths();
    }, []);

    async function handleCvUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingCv(true);
        const ext = file.name.split('.').pop();
        const fileName = `resume.${ext}`;

        if (cvPath) {
            await supabase.storage.from('resume-documents').remove([cvPath]);
        }

        const { error } = await supabase.storage
            .from('resume-documents')
            .upload(fileName, file, { upsert: true });

        if (!error) {
            setCvPath(fileName);
            setCvUrl(getPublicUrl('resume-documents', fileName));

            await supabase
                .from('site_content')
                .upsert({ key: 'resume_file_path', value: fileName }, { onConflict: 'key' });

            setSavedCv(true);
            setTimeout(() => setSavedCv(false), 2000);
        }

        setUploadingCv(false);
        if (cvRef.current) cvRef.current.value = '';
    }

    async function handleCvRemove() {
        if (!cvPath) return;
        if (!confirm('Remove the resume file?')) return;

        await supabase.storage.from('resume-documents').remove([cvPath]);
        await supabase
            .from('site_content')
            .upsert({ key: 'resume_file_path', value: '' }, { onConflict: 'key' });

        setCvPath('');
        setCvUrl(null);
    }

    async function handlePhotoUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingPhoto(true);
        const ext = file.name.split('.').pop();
        const fileName = `profile.${ext}`;

        if (photoPath) {
            await supabase.storage.from('profile-photo').remove([photoPath]);
        }

        const { error } = await supabase.storage
            .from('profile-photo')
            .upload(fileName, file, { upsert: true });

        if (!error) {
            setPhotoPath(fileName);
            setPhotoUrl(getPublicUrl('profile-photo', fileName));

            await supabase
                .from('site_content')
                .upsert({ key: 'profile_photo_path', value: fileName }, { onConflict: 'key' });

            setSavedPhoto(true);
            setTimeout(() => setSavedPhoto(false), 2000);
        }

        setUploadingPhoto(false);
        if (photoRef.current) photoRef.current.value = '';
    }

    async function handlePhotoRemove() {
        if (!photoPath) return;
        if (!confirm('Remove the profile photo?')) return;

        await supabase.storage.from('profile-photo').remove([photoPath]);
        await supabase
            .from('site_content')
            .upsert({ key: 'profile_photo_path', value: '' }, { onConflict: 'key' });

        setPhotoPath('');
        setPhotoUrl(null);
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="font-sans font-bold text-3xl text-black uppercase">
                    Resume & Profile<span className="text-grey">.</span>
                </h1>
                <p className="font-mono text-xs text-grey tracking-[0.15em] uppercase mt-2">
                    Upload your CV/resume and profile photo
                </p>
            </div>

            <div className="max-w-3xl space-y-12">
                {/* Profile Photo Section */}
                <div>
                    <h2 className="font-sans font-bold text-xl text-black uppercase mb-4">
                        Profile Photo
                    </h2>
                    {photoUrl ? (
                        <div className="mb-4">
                            <div className="w-40 h-40 rounded-full overflow-hidden brutal-border">
                                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <p className="font-mono text-[10px] text-grey mt-2">{photoPath}</p>
                        </div>
                    ) : (
                        <div className="mb-4 brutal-border bg-white p-8 text-center w-fit">
                            <Image size={48} strokeWidth={2} className="text-grey mx-auto mb-2" />
                            <p className="font-mono text-sm text-grey tracking-[0.15em] uppercase">
                                No photo uploaded
                            </p>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-4">
                        <label
                            className={`inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                                font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                                brutal-shadow-sm brutal-hover cursor-pointer
                                ${uploadingPhoto ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <Upload size={14} strokeWidth={3} />
                            {uploadingPhoto ? 'Uploading...' : photoUrl ? 'Replace Photo' : 'Upload Photo'}
                            <input
                                ref={photoRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handlePhotoUpload}
                                className="hidden"
                            />
                        </label>
                        {photoUrl && (
                            <button
                                onClick={handlePhotoRemove}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black
                                    font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                                    brutal-shadow-sm brutal-hover"
                            >
                                <Trash2 size={14} strokeWidth={3} />
                                Remove
                            </button>
                        )}
                        {savedPhoto && (
                            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-black tracking-[0.1em] uppercase">
                                <Check size={14} strokeWidth={3} /> Saved
                            </span>
                        )}
                    </div>
                    <p className="font-mono text-[10px] text-grey mt-3">
                        Recommended: Square image, at least 400×400px. JPG, PNG, or WebP.
                    </p>
                </div>

                {/* CV/Resume File Section */}
                <div>
                    <h2 className="font-sans font-bold text-xl text-black uppercase mb-4">
                        Resume / CV File
                    </h2>
                    {cvUrl ? (
                        <div className="mb-4 brutal-border bg-white p-6 flex items-center gap-4">
                            <FileText size={32} strokeWidth={2} className="text-black shrink-0" />
                            <div className="min-w-0">
                                <p className="font-sans font-semibold text-black truncate">{cvPath}</p>
                                <a
                                    href={cvUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[10px] text-grey hover:text-black transition-colors"
                                >
                                    Preview in browser →
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-4 brutal-border bg-white p-8 text-center">
                            <FileText size={48} strokeWidth={2} className="text-grey mx-auto mb-2" />
                            <p className="font-mono text-sm text-grey tracking-[0.15em] uppercase">
                                No resume uploaded
                            </p>
                            <p className="font-mono text-[10px] text-grey mt-1">
                                The Download CV button will be hidden on the About page
                            </p>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-4">
                        <label
                            className={`inline-flex items-center gap-2 px-6 py-3 bg-black text-white
                                font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                                brutal-shadow-sm brutal-hover cursor-pointer
                                ${uploadingCv ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <Upload size={14} strokeWidth={3} />
                            {uploadingCv ? 'Uploading...' : cvUrl ? 'Replace Resume' : 'Upload Resume'}
                            <input
                                ref={cvRef}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleCvUpload}
                                className="hidden"
                            />
                        </label>
                        {cvUrl && (
                            <button
                                onClick={handleCvRemove}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black
                                    font-mono text-xs tracking-[0.15em] uppercase border-[3px] border-black
                                    brutal-shadow-sm brutal-hover"
                            >
                                <Trash2 size={14} strokeWidth={3} />
                                Remove
                            </button>
                        )}
                        {savedCv && (
                            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-black tracking-[0.1em] uppercase">
                                <Check size={14} strokeWidth={3} /> Saved
                            </span>
                        )}
                    </div>
                    <p className="font-mono text-[10px] text-grey mt-3">
                        Accepted formats: PDF, DOC, DOCX. This file will be downloadable from the About page.
                    </p>
                </div>
            </div>
        </div>
    );
}
