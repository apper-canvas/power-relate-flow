import React from 'react';
import ApperIcon from '../ApperIcon'; // Keep ApperIcon in its original place

const Icon = ({ name, size, className, ...props }) => {
  return <ApperIcon name={name} size={size} className={className} {...props} />;
};

export default Icon;