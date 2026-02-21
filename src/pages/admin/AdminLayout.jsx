import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { FileText, FolderOpen, LogOut, Home, Video } from 'lucide-react';

const sidebarLinks = [
    { to: '/admin', label: 'Dashboard', icon: Home, end: true },
    { to: '/admin/content', label: 'Site Content', icon: FileText },
    { to: '/admin/hero-video', label: 'Hero Video', icon: Video },
    { to: '/admin/projects', label: 'Projects', icon: FolderOpen },
];

export default function AdminLayout() {
    const { user, profile, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-grey-light flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black text-white flex flex-col shrink-0 border-r-[3px] border-black">
                {/* Logo */}
                <div className="px-6 py-6 border-b-[3px] border-white/20">
                    <a href="/" className="font-sans font-bold text-lg text-white tracking-[0.15em] uppercase">
                        HADI<span className="text-grey">.</span>
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
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
