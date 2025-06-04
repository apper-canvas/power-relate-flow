import React from 'react';
import Icon from './Icon';
import Text from './Text';

const AppLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
      <Icon name="Zap" size={18} className="text-white" />
    </div>
    <Text as="span" className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">RelateFlow</Text>
  </div>
);

export default AppLogo;