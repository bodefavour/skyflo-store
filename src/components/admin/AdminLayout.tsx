import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-gray-800 text-white w-64`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Skyflo Admin</h1>
        </div>
        <nav className="mt-6">
          <NavItem href="/admin/dashboard" icon="dashboard" text="Dashboard" currentPath={location.pathname} />
          <NavItem href="/admin/products" icon="inventory" text="All Products" currentPath={location.pathname} />
          <NavItem href="/admin/products/add" icon="add" text="Add Product" currentPath={location.pathname} />
          <NavItem href="/admin/categories" icon="category" text="Categories" currentPath={location.pathname} />
          <NavItem href="/admin/orders" icon="receipt" text="Orders" currentPath={location.pathname} />
          <NavItem href="/admin/analytics" icon="analytics" text="Analytics" currentPath={location.pathname} />
          <NavItem href="/admin/users" icon="people" text="Users" currentPath={location.pathname} />
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 mt-4 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <span className="mx-3">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              className="md:hidden text-gray-500 focus:outline-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <span className="text-gray-700">Admin Panel</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

interface NavItemProps {
  href: string;
  icon: string;
  text: string;
  currentPath: string;
}

const NavItem = ({ href, icon, text, currentPath }: NavItemProps) => {
  const isActive = currentPath === href;

  return (
    <Link to={href}>
      <div
        className={`flex items-center px-6 py-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'} cursor-pointer`}
      >
        <span className="mx-3">{text}</span>
      </div>
    </Link>
  );
};

export default AdminLayout;