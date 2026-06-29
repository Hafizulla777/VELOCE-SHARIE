// ============================================================================
// FILE: src/pages/AdminDashboard/AdminDashboardPage.jsx
// PURPOSE: Main admin dashboard page - combines all admin components
// ============================================================================

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminDashboard/AdminSidebar';
import AdminStatsCards from '../../components/AdminDashboard/AdminStatsCards';
import CustomerTable from '../../components/AdminDashboard/CustomerTable';
import CarApprovalTable from '../../components/AdminDashboard/CarApprovalTable';
import RecentBookings from '../../components/AdminDashboard/RecentBookings';
import QuickActions from '../../components/AdminDashboard/QuickActions';

const AdminDashboardPage = () => {
  // State for dynamic data (would come from API in real app)
  const [statsData, setStatsData] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [pendingCars, setPendingCars] = useState(null);
  const [recentBookings, setRecentBookings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In real app: const response = await api.get('/admin/dashboard-stats');
        // For now, we'll use default data from components
        
        setLoading(false);
        
        console.log('📊 Admin Dashboard loaded');
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle car approval
  const handleCarApprove = (carId) => {
    console.log(`✅ Approved car ID: ${carId}`);
    // In real app: await api.put(`/admin/cars/${carId}/approve`);
    // Then show success toast notification
  };

  // Handle car rejection
  const handleCarReject = (carId, reason) => {
    console.log(`❌ Rejected car ID: ${carId}, Reason: ${reason}`);
    // In real app: await api.put(`/admin/cars/${carId}/reject`, { reason });
    // Then show rejection toast notification
  };

  // Handle quick actions
  const handleQuickAction = (actionType) => {
    console.log(`⚡ Quick action: ${actionType}`);
    // Route to appropriate page or open modal
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0a0a0a]">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 flex items-center justify-center">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-[#d4af37] text-4xl mb-4"></i>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        
        {/* Page Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-playfair text-3xl font-bold text-white">Dashboard Overview</h2>
            <p className="text-gray-400 text-sm mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Search & Notifications */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-[#1f1f1f] border border-gray-700 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-[#d4af37] w-64 transition-colors"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 bg-[#1f1f1f] rounded-lg hover:bg-opacity-80 transition-colors group">
              <i className="fas fa-bell text-gray-400 group-hover:text-[#d4af37] transition-colors"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Statistics Cards */}
        <AdminStatsCards stats={statsData} />

        {/* Two Column Layout: Customer Table + Car Approvals */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Customer Management Table */}
          <CustomerTable customers={customers} />

          {/* Pending Car Approvals */}
          <CarApprovalTable 
            pendingCars={pendingCars}
            onApprove={handleCarApprove}
            onReject={handleCarReject}
          />
        </section>

        {/* Bottom Section: Quick Actions + Recent Bookings */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions Panel */}
          <QuickActions onAction={handleQuickAction} />

          {/* Recent Bookings Feed */}
          <RecentBookings bookings={recentBookings} />
        </section>

      </main>
    </div>
  );
};

export default AdminDashboardPage;