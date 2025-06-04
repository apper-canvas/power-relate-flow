import React from 'react';
import { motion } from 'framer-motion';

const DashboardTemplate = ({ children, isSidebarCollapsed }) => {
  return (
    <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'}`}>
      <div className="p-4 lg:p-6">
        {children}
      </div>
    </main>
  );
};

export default DashboardTemplate;