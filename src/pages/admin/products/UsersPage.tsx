import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase/firebaseConfig';
import AdminLayout from '../../../components/admin/AdminLayout';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: string;
  lastLogin: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData: User[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as User));
        setUsers(usersData);
      } catch (err) {
        setError('Failed to fetch users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-[#d4af37]/10 text-[#d4af37]';
      case 'editor':
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading users...</div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
            <div className="grid grid-cols-12 p-4 border-b border-[#2a2a2a] font-medium text-[#d4af37]">
              <div className="col-span-4">User</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Last Login</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {users.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No users found</div>
            ) : (
              users.map((user) => (
                <div key={user.id} className="grid grid-cols-12 p-4 border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/50">
                  <div className="col-span-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center mr-3">
                        <span className="text-[#d4af37]">
                          {user.displayName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <div>{user.displayName || 'No name'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 truncate">{user.email}</div>
                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getRoleBadge(user.role || 'user')}`}>
                      {user.role || 'user'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </div>
                  <div className="col-span-1 flex justify-end space-x-2">
                    <button className="text-[#d4af37] hover:text-[#c99b3f] p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-red-500 hover:text-red-400 p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UsersPage;