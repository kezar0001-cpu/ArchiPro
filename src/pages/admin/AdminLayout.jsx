import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { FileText, FolderOpen, LogOut, Home, Video, User, Menu, X } from 'lucide-react';

const sidebarLinks = [
    { to: '/admin', label: 'Dashboard', icon: Home, end: true },
    { to: '/admin/content', label: 'Site Content', icon: FileText },
    { to: '/admin/hero-video', label: 'Hero Video', icon: Video },
    { to: '/admin/resume', label: 'Resume & Profile', icon: User },
    { to: '/admin/projects', label: 'Projects', icon: FolderOpen },
];

export default function AdminLayout() {
    const { user, profile, signOut } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        return () => document.body.classList.remove('menu-open');
    }, [sidebarOpen]);

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="px-6 py-6 border-b-[3px] border-white/20">
                <a href="/" className="font-sans font-bold text-lg text-white tracking-[0.15em] uppercase">
                    HADIL AL-DULEIMI<span className="text-grey">.</span>
                </a>
                <p className="font-mono text-[10px] text-grey tracking-[0.15em] uppercase mt-1">
                    Admin Panel
                </p>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 py-4">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-6 py-3 font-mono text-xs tracking-[0.1em] uppercase
                                transition-colors duration-200
                                ${isActive
                                    ? 'bg-white text-black'
                                    : 'text-grey hover:text-white hover:bg-white/10'
                                }`
                            }
                        >
                            <Icon size={16} strokeWidth={3} />
                            {link.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Info + Sign Out */}
            <div className="px-6 py-4 border-t-[3px] border-white/20">
                <p className="font-mono text-[10px] text-grey tracking-[0.1em] uppercase truncate mb-1">
                    {profile?.display_name || user?.email}
                </p>
                <p className="font-mono text-[10px] text-grey/50 tracking-[0.1em] uppercase mb-3">
                    {profile?.role || 'editor'}
                </p>
                <button
                    onClick={signOut}
                    className="flex items-center gap-2 font-mono text-xs text-grey tracking-[0.1em] uppercase
                        hover:text-white transition-colors duration-200"
                >
                    <LogOut size={14} strokeWidth={3} />
                    Sign Out
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-grey-light flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-black text-white flex-col shrink-0 border-r-[3px] border-black">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Drawer */}
            <div
                className={`admin-sidebar md:hidden w-64 bg-black text-white flex flex-col shrink-0${sidebarOpen ? ' open' : ''}`}
            >
                <SidebarContent />
            </div>

            {/* Mobile Overlay */}
            <div
                className={`admin-overlay md:hidden${sidebarOpen ? ' open' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto min-w-0">
                {/* Mobile top bar */}
                <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-black border-b border-white/10 sticky top-0 z-50">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex items-center justify-center text-white"
                        style={{ width: '44px', height: '44px' }}
                        aria-label="Open menu"
                    >
                        <Menu size={20} strokeWidth={3} />
                    </button>
                    <span className="font-sans font-bold text-sm text-white tracking-[0.15em] uppercase">
                        Admin Panel
                    </span>
                </div>
                <Outlet />
            </main>
        </div>
    );
}
