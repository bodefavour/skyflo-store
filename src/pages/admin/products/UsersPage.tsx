import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { fetchUserProfiles, updateUserRole } from '../../../services/usersService';
import { UserProfile, UserRole } from '../../../types/types';

const UsersPage = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roleUpdating, setRoleUpdating] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const profiles = await fetchUserProfiles();
        setUsers(profiles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
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
      case 'staff':
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const handleRoleChange = async (userId: string, nextRole: UserRole) => {
    setError('');
    setSuccessMessage('');
    setRoleUpdating(userId);

    try {
      await updateUserRole(userId, nextRole);
      setUsers((prev) =>
        prev.map((profile) =>
          profile.id === userId
            ? {
                ...profile,
                role: nextRole,
              }
            : profile
        )
      );
      setSuccessMessage(`Updated role to ${nextRole} successfully.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
    } finally {
      setRoleUpdating(null);
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return 'Never';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Never' : date.toLocaleDateString();
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>

        {successMessage && (
          <div className="bg-emerald-900/20 border border-emerald-500 text-emerald-200 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
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
                          {user.display_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div>{user.display_name || user.email.split('@')[0]}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 truncate">{user.email}</div>
                  <div className="col-span-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="col-span-2">
                    {formatDate(user.last_login)}
                  </div>
                  <div className="col-span-1 flex justify-end space-x-2">
                    <select
                      value={user.role}
                      onChange={(event) => handleRoleChange(user.id, event.target.value as UserRole)}
                      disabled={roleUpdating === user.id}
                      className="bg-[#0a0a0a] border border-[#2a2a2a] text-white text-sm rounded px-2 py-1 focus:border-[#d4af37]"
                    >
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                      <option value="user">User</option>
                    </select>
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