import React from 'react';
import Icon from './Icon';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '', 
  icon, 
  iconPosition = 'left',
  required = false,
  disabled = false,
  min, 
  max, 
  ...props 
}) => {
  const baseClasses = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all";
  const defaultClasses = "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white";
  const searchClasses = "pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:bg-white dark:focus:bg-gray-600";

  let finalClasses = `${baseClasses} ${defaultClasses} ${className}`;
  let inputPadding = '';

  if (icon) {
    if (iconPosition === 'left') {
      inputPadding = 'pl-10';
    } else if (iconPosition === 'right') {
      inputPadding = 'pr-10';
    }
    finalClasses = `${baseClasses} ${defaultClasses} ${inputPadding} ${className}`;
  }

  if (props.isSearch) { // Specific class for search bars
    finalClasses = `w-full ${searchClasses} ${className}`;
    inputPadding = 'pl-10'; // Ensure search always has left padding for icon
  }

  return (
    <div className="relative">
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={finalClasses}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        {...props}
      />
      {icon && iconPosition === 'right' && (
        <Icon name={icon} size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}
    </div>
  );
};

export default Input;