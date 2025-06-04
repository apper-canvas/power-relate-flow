import React from 'react';
import Input from '../atoms/Input';

const SearchBar = ({ placeholder, value, onChange, className = '', ...props }) => {
  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isSearch // Custom prop to apply search-specific styles
        {...props}
      />
    </div>
  );
};

export default SearchBar;