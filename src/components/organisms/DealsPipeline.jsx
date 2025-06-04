import React from 'react';
import { motion } from 'framer-motion';
import Card from '../molecules/Card';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const DealsPipeline = ({ deals, dealStages, getStageDeals, getStageTotal, getContactName, onAddDeal }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      {dealStages.map((stage) => (
        <Card key={stage}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Text as="h3" className="font-semibold text-gray-900 dark:text-white capitalize">
              {stage}
            </Text>
            <Text className="text-sm text-gray-500">
              ${getStageTotal(stage).toLocaleString()}
            </Text>
          </div>
          <div className="p-4 space-y-3 min-h-64">
            {getStageDeals(stage).map((deal) => (
              <motion.div
                key={deal?.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer"
              >
                <Text as="h4" className="font-medium text-gray-900 dark:text-white text-sm">
                  {deal?.title || 'Untitled Deal'}
                </Text>
                <Text className="text-lg font-bold text-primary">
                  ${(deal?.value || 0).toLocaleString()}
                </Text>
                <Text className="text-xs text-gray-500">
                  {getContactName(deal?.contactId)}
                </Text>
                <div className="flex justify-between items-center mt-2">
                  <Text className="text-xs text-gray-500">
                    {deal?.probability || 0}% likely
                  </Text>
                </div>
              </motion.div>
            ))}
            {getStageDeals(stage).length === 0 && (
              <div className="text-center py-8">
                <Icon name="Plus" size={24} className="text-gray-400 mx-auto mb-2" />
                <Text className="text-sm text-gray-500">No deals in {stage}</Text>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DealsPipeline;