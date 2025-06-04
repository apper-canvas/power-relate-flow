import React from 'react';

const Label = ({ htmlFor, children, className = '', ...props }) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`} 
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;