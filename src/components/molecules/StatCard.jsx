import React from 'react';
import Card from './Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const StatCard = ({ title, value, icon, iconBgClass, iconColorClass }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <Text className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</Text>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">{value}</Text>
      </div>
      <div className={`${iconBgClass} p-3 rounded-lg`}>
        <Icon name={icon} size={24} className={iconColorClass} />
      </div>
    </div>
  </Card>
);

export default StatCard;