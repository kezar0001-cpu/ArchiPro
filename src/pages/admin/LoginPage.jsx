import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error: authError } = await signIn(email, password);

        if (authError) {
            setError(authError.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-8">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-12">
                    <a href="/" className="font-sans font-bold text-2xl text-white tracking-[0.15em] uppercase">
                        HADIL AL-DULEIMI<span className="text-grey">.</span>
                    </a>
                    <p className="font-mono text-xs text-grey tracking-[0.2em] uppercase mt-2">
                        Admin Portal
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="bg-white border-[3px] border-white p-8">
                    <h1 className="font-sans font-bold text-2xl text-black uppercase mb-8">
                        Sign In<span className="text-grey">.</span>
                    </h1>

                    {error && (
                        <div className="mb-6 p-4 bg-grey-light border-[3px] border-black">
                            <p className="font-mono text-xs text-black tracking-[0.1em]">
                                {error}
                            </p>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div>
                            <label className="block font-mono text-xs text-grey tracking-[0.15em] uppercase mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm
                                    focus:outline-none focus:ring-0 focus:border-grey
                                    transition-colors duration-200"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block font-mono text-xs text-grey tracking-[0.15em] uppercase mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-[3px] border-black font-sans text-sm
                                    focus:outline-none focus:ring-0 focus:border-grey
                                    transition-colors duration-200"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-4 bg-black text-white font-mono text-sm tracking-[0.15em] uppercase
                                border-[3px] border-black brutal-shadow-sm brutal-hover
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-8">
                    <a
                        href="/"
                        className="font-mono text-xs text-grey tracking-[0.15em] uppercase hover:text-white transition-colors duration-200"
                    >
                        ← Back to Site
                    </a>
                </div>
            </div>
        </div>
    );
}
