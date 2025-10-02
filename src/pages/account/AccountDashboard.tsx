import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentProfile, signOutUser } from '../../services/authService';
import { UserProfile } from '../../types/types';

const AccountDashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = true;

        const fetchProfile = async () => {
            try {
                const current = await getCurrentProfile();

                if (!mounted) return;

                if (!current) {
                    navigate('/login', { replace: true });
                    return;
                }

                setProfile(current);
            } catch (err) {
                if (!mounted) return;
                setError(err instanceof Error ? err.message : 'Unable to load account details.');
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchProfile();

        return () => {
            mounted = false;
        };
    }, [navigate]);

    const handleSignOut = async () => {
        try {
            await signOutUser();
            navigate('/', { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to sign out.');
        }
    };

    return (
        <section className="min-h-screen bg-[#050505] text-white px-6 py-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-semibold mb-6">Your account</h1>
                <p className="text-gray-400 mb-12">Manage your profile, view your role, and sign out securely.</p>

                {error && (
                    <div className="mb-6 rounded-lg border border-red-500 bg-red-900/20 px-4 py-3 text-sm text-red-100">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-10 text-gray-400">
                        Loading your details...
                    </div>
                ) : profile ? (
                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-10 shadow-2xl">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/15 text-2xl font-semibold text-[#d4af37]">
                                        {(profile.display_name || profile.email).charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold">{profile.display_name || profile.email.split('@')[0]}</h2>
                                        <p className="text-gray-400">{profile.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="rounded-full bg-[#d4af37]/10 px-4 py-2 text-sm font-medium uppercase tracking-wide text-[#d4af37]">
                                    {profile.role}
                                </span>
                                <button
                                    onClick={handleSignOut}
                                    className="rounded-lg border border-[#2a2a2a] px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-red-500 hover:text-red-400"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>

                        <div className="mt-10 grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-6">
                                <h3 className="text-lg font-semibold mb-2">Last login</h3>
                                <p className="text-gray-300">
                                    {profile.last_login
                                        ? new Date(profile.last_login).toLocaleString()
                                        : 'No login activity recorded yet.'}
                                </p>
                            </div>
                            <div className="rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] p-6">
                                <h3 className="text-lg font-semibold mb-2">Member since</h3>
                                <p className="text-gray-300">
                                    {profile.created_at
                                        ? new Date(profile.created_at).toLocaleDateString()
                                        : '—'}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default AccountDashboard;
