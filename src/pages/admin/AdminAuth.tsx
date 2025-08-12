import { useState } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, db } from '../../Firebase/firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [setupKey, setSetupKey] = useState('');
  const [isInitialSetup, setIsInitialSetup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const adminConfig = await getDoc(doc(db, 'adminConfig', 'setup'));
        
        if (!adminConfig.data()?.adminEmails?.includes(userCredential.user.email)) {
          await auth.signOut();
          throw new Error('Not an admin');
        }
        navigate('/admin/dashboard');
      } else {
        if (isInitialSetup) {
          const adminConfig = await getDoc(doc(db, 'adminConfig', 'setup'));
          
          if (adminConfig.data()?.key !== setupKey) {
            throw new Error('Invalid setup key');
          }

          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await updateDoc(doc(db, 'adminConfig', 'setup'), {
            adminEmails: arrayUnion(email)
          });

          navigate('/admin/dashboard');
        } else {
          throw new Error('New admins require setup key');
        }
      }
    } catch (err) {
 if (err instanceof Error) {
 setError(err.message);
      } else {
 setError('An unknown error occurred.');
      }
    }
  };

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

          {!isLogin && isInitialSetup && (
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

          {!isLogin && !isInitialSetup && (
            <button 
              onClick={() => setIsInitialSetup(true)}
              className="block w-full text-[#d4af37] hover:text-[#c99b3f] text-sm transition-colors mt-2"
            >
              Perform initial setup
            </button>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-[#2a2a2a] text-center">
          <p className="text-gray-500 text-xs">
            For security reasons, admin access is strictly controlled
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;