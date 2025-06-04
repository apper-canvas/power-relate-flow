import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TopNavigation from '../organisms/TopNavigation';
import Sidebar from '../organisms/Sidebar';
import MobileOverlay from '../organisms/MobileOverlay';
import DashboardTemplate from './DashboardTemplate';
import MainContent from '../organisms/MainContent';

const PageLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3', active: true },
    { id: 'contacts', label: 'Contacts', icon: 'Users', active: true },
    { id: 'deals', label: 'Deals', icon: 'TrendingUp', active: true },
    { id: 'activities', label: 'Activities', icon: 'Clock', active: true },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare', active: false },
    { id: 'analytics', label: 'Analytics', icon: 'PieChart', active: false },
    { id: 'reports', label: 'Reports', icon: 'FileText', active: false },
    { id: 'settings', label: 'Settings', icon: 'Settings', active: true }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <TopNavigation 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onToggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />

      <div className="flex pt-14">
        <Sidebar
          navigationItems={navigationItems}
          activeView={activeView}
          setActiveView={setActiveView}
          isCollapsed={sidebarCollapsed}
        />

        <DashboardTemplate isSidebarCollapsed={sidebarCollapsed}>
          <MainContent activeView={activeView} />
        </DashboardTemplate>
      </div>

      <MobileOverlay
        isOpen={!sidebarCollapsed}
        onClick={() => setSidebarCollapsed(true)}
      />
    </div>
  );
};

export default PageLayout;