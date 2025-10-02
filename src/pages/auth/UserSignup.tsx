import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser, SignUpUserParams } from '../../services/authService';

const UserSignup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<SignUpUserParams>({
        email: '',
        password: '',
        displayName: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setInfoMessage('');

        if (form.password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (form.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            const result = await signUpUser({
                email: form.email.trim(),
                password: form.password,
                displayName: form.displayName.trim() || form.email.split('@')[0],
            });

            if (result.needsVerification) {
                setInfoMessage('Check your email to verify your account before signing in.');
                return;
            }

            navigate('/account');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to sign up right now.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 py-24">
            <div className="w-full max-w-lg bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl font-semibold text-center mb-2">Create your Skyflo account</h1>
                <p className="text-center text-gray-400 mb-8">Join to track orders, save favourites, and access exclusive offers.</p>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-500 bg-red-900/20 px-4 py-3 text-sm text-red-100">
                        {error}
                    </div>
                )}

                {infoMessage && (
                    <div className="mb-4 rounded-lg border border-emerald-600 bg-emerald-900/20 px-4 py-3 text-sm text-emerald-100">
                        {infoMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
                                Full name
                            </label>
                            <input
                                id="displayName"
                                name="displayName"
                                type="text"
                                value={form.displayName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-[#2a2a2a] bg-[#050505] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
                                placeholder="Jane Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-[#2a2a2a] bg-[#050505] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-[#2a2a2a] bg-[#050505] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
                                placeholder="Create a password"
                                required
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                className="w-full rounded-lg border border-[#2a2a2a] bg-[#050505] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
                                placeholder="Repeat your password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-[#d4af37] px-4 py-3 font-semibold text-black transition hover:bg-[#c99b3f] disabled:opacity-60"
                    >
                        {loading ? 'Creating account…' : 'Create account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#d4af37] hover:text-[#c99b3f]">
                        Sign in
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default UserSignup;
