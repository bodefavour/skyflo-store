import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInUser, requestPasswordReset } from '../../services/authService';

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    try {
      await signInUser(email.trim(), password);
      navigate('/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setInfoMessage('');

    if (!email) {
      setError('Enter your email to receive reset instructions.');
      return;
    }

    try {
      await requestPasswordReset(email.trim());
      setInfoMessage('Password reset email sent. Check your inbox.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send reset email.');
    }
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md bg-[#111111] border border-[#2a2a2a] rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-semibold text-center mb-2">Welcome back</h1>
          <p className="text-center text-gray-400 mb-8">Sign in to manage your orders and wishlist.</p>

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
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#050505] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-[#2a2a2a] bg-[#050505] px-4 py-3 text-white focus:border-[#d4af37] focus:outline-none"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#d4af37] px-4 py-3 font-semibold text-black transition hover:bg-[#c99b3f] disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
            <button
              type="button"
              onClick={handleResetPassword}
              className="text-[#d4af37] hover:text-[#c99b3f]"
              disabled={loading}
            >
              Forgot password?
            </button>
            <span>
              No account?{' '}
              <Link to="/signup" className="text-[#d4af37] hover:text-[#c99b3f]">
                Create one
              </Link>
            </span>
          </div>
      </div>
    </section>
  );
};

export default UserLogin;
