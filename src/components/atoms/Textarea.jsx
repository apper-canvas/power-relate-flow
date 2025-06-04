import React from 'react';

const Textarea = ({ placeholder, value, onChange, rows = 3, className = '', required = false, ...props }) => {
  const baseClasses = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary";
  const defaultClasses = "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white";

  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`${baseClasses} ${defaultClasses} ${className}`}
      required={required}
      {...props}
    />
  );
};

export default Textarea;