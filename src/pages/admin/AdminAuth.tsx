import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  checkAdminSetup,
  hasAdminAccount,
  signInAdmin,
  signOutAdmin,
  signUpAdmin,
} from '../../services/authService';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setupKey, setSetupKey] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isInitialSetup, setIsInitialSetup] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const hasAdmin = await hasAdminAccount();
        console.log('[AdminAuth:init] existing admin detected?', hasAdmin);
        if (!hasAdmin) {
          setIsLogin(false);
          setIsInitialSetup(true);
        }
        const setupStatus = await checkAdminSetup();
        console.log('[AdminAuth:init] setup status', setupStatus);
        console.log('[AdminAuth:init] using runtime setup key?', Boolean(setupKey));
        if (!setupStatus.configured) {
          setError('Admin setup is not configured yet. Please run the database migration.');
        }
      } catch (err) {
        console.error('[AdminAuth:init] failed to load admin settings', err);
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unable to load admin settings.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        console.log('[AdminAuth:auth] attempting admin login', { email });
        const profile = await signInAdmin(email, password);
        console.log('[AdminAuth:auth] login profile', profile);
        if (profile.role !== 'admin') {
          setError('This account does not have admin access.');
          await signOutAdmin();
          return;
        }
        navigate('/admin/dashboard');
      } else {
        console.log('[AdminAuth:auth] attempting admin signup', { email, setupProvided: Boolean(setupKey) });
        if (!isInitialSetup) {
          setError('Admin registration is disabled.');
          return;
        }

        const { profile, needsVerification } = await signUpAdmin(email, password, setupKey);
        console.log('[AdminAuth:auth] signup result', { profile, needsVerification });

        if (needsVerification) {
          setError('Check your email to confirm the account before logging in.');
          return;
        }

        if (!profile) {
          setError('Sign-up completed. Please try signing in.');
          return;
        }

        navigate('/admin/dashboard');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error('[AdminAuth:auth] error', message, err);
      setError(message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-sm text-gray-400">Loading admin portal...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="border-t border-b border-[#d4af37] py-1 px-6 text-sm tracking-widest text-[#d4af37]">
              {isLogin ? 'ADMIN PORTAL' : 'ADMIN SETUP'}
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-light">
            {isLogin ? 'Welcome Back' : 'Create Admin Account'}
          </h2>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#d4af37] focus:outline-none transition-all"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#d4af37] focus:outline-none transition-all"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-400 text-sm mb-2">Setup Key</label>
              <input
                type="password"
                value={setupKey}
                onChange={(e) => setSetupKey(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#d4af37] focus:outline-none transition-all"
                placeholder="Enter setup key"
                required
              />
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#d4af37] hover:bg-[#c99b3f] text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg"
          >
            {isLogin ? 'Login' : 'Setup Admin'}
          </motion.button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#d4af37] hover:text-[#c99b3f] text-sm transition-colors"
          >
            {isLogin ? 'Need to setup first admin?' : 'Already have an account?'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[#2a2a2a] text-center">
          <p className="text-gray-500 text-xs">
            Admin access is limited to approved users managed via Supabase Auth.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;