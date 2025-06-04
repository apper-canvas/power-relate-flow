import React from 'react';
import StatCard from '../molecules/StatCard';

const DashboardStats = ({ contactsCount, dealsCount, pipelineTotal, activitiesCount }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
    <StatCard
      title="Total Contacts"
      value={contactsCount}
      icon="Users"
      iconBgClass="bg-blue-100 dark:bg-blue-900"
      iconColorClass="text-blue-600 dark:text-blue-400"
    />
    <StatCard
      title="Active Deals"
      value={dealsCount}
      icon="TrendingUp"
      iconBgClass="bg-green-100 dark:bg-green-900"
      iconColorClass="text-green-600 dark:text-green-400"
    />
    <StatCard
      title="Total Pipeline"
      value={`$${pipelineTotal.toLocaleString()}`}
      icon="DollarSign"
      iconBgClass="bg-purple-100 dark:bg-purple-900"
      iconColorClass="text-purple-600 dark:text-purple-400"
    />
    <StatCard
      title="Activities"
      value={activitiesCount}
      icon="Clock"
      iconBgClass="bg-orange-100 dark:bg-orange-900"
      iconColorClass="text-orange-600 dark:text-orange-400"
    />
  </div>
);

export default DashboardStats;