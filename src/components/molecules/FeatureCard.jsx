import React from 'react';
import Card from './Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const FeatureCard = ({ title, message, icon }) => (
  <Card className="p-12 max-w-md mx-auto text-center">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
      <Icon name={icon} size={32} className="text-gray-400" />
    </div>
    <Text as="h2" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      {title}
    </Text>
    <Text className="text-gray-600 dark:text-gray-400 mb-6">
      {message}
    </Text>
    <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
      <Text className="text-amber-800 dark:text-amber-200 text-sm font-medium">
        Coming Soon! This feature is currently in development.
      </Text>
    </div>
  </Card>
);

export default FeatureCard;