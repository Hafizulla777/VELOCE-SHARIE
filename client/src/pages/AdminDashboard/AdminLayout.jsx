// ============================================================================
// FILE: src/pages/AdminDashboard/AdminLayout.jsx
// PURPOSE: Layout wrapper for all admin pages (reusable)
// ============================================================================

import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminDashboard/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Admin Sidebar - Fixed Position */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* Outlet renders child routes here */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;