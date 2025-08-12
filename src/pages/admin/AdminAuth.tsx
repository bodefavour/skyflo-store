import { useState } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, db } from '../../Firebase/firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [setupKey, setSetupKey] = useState(''); // For initial setup
  const [isInitialSetup, setIsInitialSetup] = useState(false); // Setup mode flag
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Existing login logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const adminConfig = await getDoc(doc(db, 'adminConfig', 'setup'));
        
        if (!adminConfig.data()?.adminEmails?.includes(userCredential.user.email)) {
          await auth.signOut();
          throw new Error('Not an admin');
        }
        navigate('/admin/dashboard');
      } else {
        // New account creation
        if (isInitialSetup) {
          // Verify setup key
          const adminConfig = await getDoc(doc(db, 'adminConfig', 'setup'));
          
          if (adminConfig.data()?.key !== setupKey) {
            throw new Error('Invalid setup key');
          }

          // Create admin account
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          
          // Add email to admin list
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
 }
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Admin Login' : 'Admin Setup'}</h2>
      
      <form onSubmit={handleAuth}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          minLength={6}
        />

        {!isLogin && isInitialSetup && (
          <input
            type="password"
            value={setupKey}
            onChange={(e) => setSetupKey(e.target.value)}
            placeholder="Setup key"
            required
          />
        )}

        <button type="submit">
          {isLogin ? 'Login' : 'Setup Admin'}
        </button>

        {error && <div className="error">{error}</div>}
      </form>

      <div className="auth-options">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-link"
        >
          {isLogin ? 'Need to setup first admin?' : 'Already have an account?'}
        </button>

        {!isLogin && !isInitialSetup && (
          <button 
            onClick={() => setIsInitialSetup(true)}
            className="text-link"
          >
            Perform initial setup
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminAuth;