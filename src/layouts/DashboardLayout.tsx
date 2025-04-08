
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Header isDashboard={true} onMenuClick={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} />
          <main className="flex-1 p-6 transition-all duration-300">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
