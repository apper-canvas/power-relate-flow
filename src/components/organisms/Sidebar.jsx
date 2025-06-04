import React from 'react';
import { motion } from 'framer-motion';
import NavigationItem from '../molecules/NavigationItem';

const Sidebar = ({ navigationItems, activeView, setActiveView, isCollapsed }) => {
  return (
    <motion.aside
      initial={{ x: -240, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: isCollapsed ? 0 : 240
      }}
      className={`fixed left-0 top-14 bottom-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 lg:relative lg:translate-x-0 ${
        isCollapsed ? 'w-0 overflow-hidden lg:w-16' : 'w-60'
      }`}
    >
      <div className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            onClick={setActiveView}
            isActive={activeView === item.id}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;