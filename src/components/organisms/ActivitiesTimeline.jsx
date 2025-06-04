import React from 'react';
import Card from '../molecules/Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ActivitiesTimeline = ({ activities, isLoading, onLogActivity, getContactName, getDealTitle }) => {
  const getIconForActivityType = (type) => {
    switch (type) {
      case 'call': return 'Phone';
      case 'meeting': return 'Calendar';
      case 'email': return 'Mail';
      default: return 'FileText';
    }
  };

  const getBgClassForActivityType = (type) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-600';
      case 'meeting': return 'bg-green-100 text-green-600';
      case 'email': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const emptyMessage = {
    icon: 'Clock',
    title: 'No activities yet',
    description: 'Start logging your customer interactions.'
  };

  const emptyAction = {
    label: 'Log Activity',
    onClick: onLogActivity
  };

  return (
    <Card className="divide-y divide-gray-200 dark:divide-gray-700">
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <Text className="text-gray-500 mt-2">Loading activities...</Text>
        </div>
      ) : activities.length === 0 ? (
        <div className="p-8 text-center">
          <Icon name={emptyMessage.icon} size={48} className="text-gray-400 mx-auto mb-4" />
          <Text as="h3" className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {emptyMessage.title}
          </Text>
          <Text className="text-gray-500 mb-4">{emptyMessage.description}</Text>
          <Button onClick={emptyAction.onClick}>
            {emptyAction.label}
          </Button>
        </div>
      ) : (
        <>
          {activities.map((activity) => (
            <div key={activity?.id} className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBgClassForActivityType(activity?.type)}`}>
                  <Icon name={getIconForActivityType(activity?.type)} size={18} />
                </div>
                <div className="flex-1">
                  <Text as="h4" className="font-medium text-gray-900 dark:text-white">
                    {activity?.subject || 'No subject'}
                  </Text>
                  <Text className="text-sm text-gray-500 mb-2">
                    {activity?.description || 'No description'}
                  </Text>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{getContactName(activity?.contactId)}</span>
                    {activity?.dealId && (
                      <>
                        <span>•</span>
                        <span>Deal: {getDealTitle(activity?.dealId)}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>{activity?.duration || 0} minutes</span>
                    <span>•</span>
                    <span>
                      {activity?.activityDate ? 
                        new Date(activity.activityDate).toLocaleDateString() : 
                        'No date'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </Card>
  );
};

export default ActivitiesTimeline;