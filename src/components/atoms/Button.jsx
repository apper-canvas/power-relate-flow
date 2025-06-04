import React from 'react';
import { motion } from 'framer-motion';
import Icon from './Icon';

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconSize = 16, 
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = "flex items-center justify-center space-x-2 rounded-lg font-medium transition-colors";
  
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-dark text-white shadow-lg",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
    ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    icon: "p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
    icon: "p-2"
  };

  const currentSizeClass = variant === 'icon' ? sizeClasses.icon : sizeClasses[size];
  const currentVariantClass = variantClasses[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <Icon name={icon} size={iconSize} />}
      {children}
      {icon && iconPosition === 'right' && <Icon name={icon} size={iconSize} />}
    </>
  );

  if (variant === 'icon') {
    return (
      <motion.button
        type={type}
        onClick={onClick}
        className={`${baseClasses} ${currentVariantClass} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={disabled}
        {...props}
      >
        <Icon name={icon} size={iconSize} />
      </motion.button>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${currentSizeClass} ${currentVariantClass} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;