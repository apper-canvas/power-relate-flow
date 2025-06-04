import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import AppLogo from '../atoms/AppLogo';
import Input from '../atoms/Input';

const TopNavigation = ({ onToggleSidebar, onToggleDarkMode, darkMode }) => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
    >
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={onToggleSidebar}
            className="lg:hidden"
            variant="icon"
            icon="Menu"
            iconSize={20}
          />
          <AppLogo />
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <Input
            type="text"
            placeholder="Search contacts, deals..."
            icon="Search"
            isSearch
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <Button variant="icon" icon="Plus" iconSize={18} className="hidden sm:block" />
          <Button variant="icon" icon="Bell" iconSize={18} />
          <Button
            onClick={onToggleDarkMode}
            variant="icon"
            icon={darkMode ? "Sun" : "Moon"}
            iconSize={18}
          />
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNavigation;