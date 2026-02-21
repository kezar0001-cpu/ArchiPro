import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

/**
 * RequireAuth — Route guard for admin pages.
 * Redirects to /admin/login if not authenticated.
 * Shows "no access" if authenticated but missing required role.
 */
export default function RequireAuth({ children, requiredRole = 'editor' }) {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-grey-light flex items-center justify-center">
                <div className="w-12 h-12 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    if (requiredRole && profile) {
        const hasAccess = profile.role === 'admin' || profile.role === requiredRole;
        if (!hasAccess) {
            return (
                <div className="min-h-screen bg-grey-light flex items-center justify-center">
                    <div className="text-center brutal-border brutal-shadow bg-white p-12">
                        <h1 className="font-sans font-bold text-3xl text-black mb-4 uppercase">
                            Access Denied
                        </h1>
                        <p className="font-mono text-sm text-grey tracking-[0.15em] uppercase">
                            You don't have permission to access this area.
                        </p>
                    </div>
                </div>
            );
        }
    }

    return children;
}
