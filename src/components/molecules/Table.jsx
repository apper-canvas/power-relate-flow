import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const Table = ({ headers, data, renderRow, onSort, sortField, sortDirection, isLoading, emptyMessage, emptyAction }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden">
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <Text className="text-gray-500 mt-2">Loading data...</Text>
        </div>
      ) : data.length === 0 ? (
        <div className="p-8 text-center">
          <Icon name={emptyMessage.icon} size={48} className="text-gray-400 mx-auto mb-4" />
          <Text as="h3" className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {emptyMessage.title}
          </Text>
          <Text className="text-gray-500 mb-4">{emptyMessage.description}</Text>
          {emptyAction && (
            <button
              onClick={emptyAction.onClick}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {emptyAction.label}
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.field}
                    onClick={() => onSort && onSort(header.field)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header.label}</span>
                      {sortField === header.field && (
                        <Icon 
                          name={sortDirection === 'asc' ? "ChevronUp" : "ChevronDown"} 
                          size={14} 
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((item) => (
                <motion.tr
                  key={item?.id}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {renderRow(item)}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;