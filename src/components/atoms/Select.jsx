import React from 'react';

const Select = ({ value, onChange, options, className = '', required = false, ...props }) => {
  const baseClasses = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary";
  const defaultClasses = "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white";

  return (
    <select
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${defaultClasses} ${className}`}
      required={required}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="capitalize">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;