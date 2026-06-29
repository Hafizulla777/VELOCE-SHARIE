import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiBook, FiUser, FiLogOut, FiPlusCircle, FiList, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" />;

  // Define links based on user role
  const customerLinks = [
    { to: '/dashboard', icon: FiHome, label: 'Overview', end: true },
    { to: '/dashboard/my-bookings', icon: FiBook, label: 'My Bookings' },
    { to: '/dashboard/profile', icon: FiUser, label: 'Profile' },
  ];

  const ownerLinks = [
    { to: '/dashboard/owner/add-car', icon: FiPlusCircle, label: 'Add Car' },
    { to: '/dashboard/owner/my-fleet', icon: FiList, label: 'My Fleet' },
    { to: '/dashboard/owner/bookings', icon: FiCalendar, label: 'Bookings' },
    { to: '/dashboard/owner/earnings', icon: FiDollarSign, label: 'Earnings' },
  ];

  const activeLinks = user.role === 'owner' || user.role === 'admin' 
    ? [...customerLinks.slice(0, 1), ...ownerLinks, ...customerLinks.slice(1)] 
    : customerLinks;

  return (
    <div className="flex min-h-screen bg-dark-DEFAULT">
      {/* Sidebar */}
      <aside className="w-72 bg-dark-100 border-r border-white/5 flex flex-col fixed h-full z-40">
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="text-2xl font-black text-primary-500">Veloce Share</Link>
          <p className="text-xs text-gray-500 mt-1">Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {activeLinks.map((link) => {
            const isActive = link.end ? location.pathname === link.to : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold text-sm">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
          >
            <FiLogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72">
        {/* <Outlet /> is where the actual page (DashboardHome, MyBookings, etc.) renders */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;