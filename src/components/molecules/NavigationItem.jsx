import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const NavigationItem = ({ item, onClick, isActive, isCollapsed }) => (
  <motion.button
    key={item.id}
    onClick={item.active ? () => onClick(item.id) : undefined}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all ${
      isActive
        ? 'bg-primary text-white shadow-lg'
        : item.active
        ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
    }`}
    disabled={!item.active}
  >
    <Icon name={item.icon} size={18} className={isActive ? 'text-white' : ''} />
    {!isCollapsed && (
      <Text as="span" className="font-medium">{item.label}</Text>
    )}
    {!item.active && !isCollapsed && (
      <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
        Soon
      </span>
    )}
  </motion.button>
);

export default NavigationItem;