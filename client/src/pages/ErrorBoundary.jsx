// ============================================================================
// FILE: src/pages/NotFoundPage.jsx (or ErrorBoundary.jsx)
// PURPOSE: Premium animated 404 error page - The final component!
// ============================================================================

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import NotFoundAnimation from '../components/Error/NotFoundAnimation';
import NotFoundContent from '../components/Error/NotFoundContent';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Animated 404 Visual */}
        <NotFoundAnimation />
        
        {/* Content Section */}
        <NotFoundContent />

      </main>

     
    </div>
  );
};

export default NotFoundPage;