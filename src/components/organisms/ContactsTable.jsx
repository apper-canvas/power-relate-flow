import React from 'react';
import Table from '../molecules/Table';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ContactsTable = ({ 
  contacts, 
  onEdit, 
  onDelete, 
  isLoading, 
  onAddContact,
  sortField, 
  sortDirection, 
  onSort 
}) => {
  const headers = [
    { field: 'firstName', label: 'Name' },
    { field: 'company', label: 'Company' },
    { field: 'email', label: 'Email' },
    { field: 'phone', label: 'Phone' },
    { field: 'actions', label: 'Actions' } // Placeholder for actions column
  ];

  const renderContactRow = (contact) => (
    <>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-medium">
            {((contact?.firstName || '').charAt(0) + (contact?.lastName || '').charAt(0)) || 'U'}
          </div>
          <div className="ml-4">
            <Text className="text-sm font-medium text-gray-900 dark:text-white">
              {`${contact?.firstName || ''} ${contact?.lastName || ''}`.trim() || 'Unknown'}
            </Text>
            <Text className="text-sm text-gray-500">{contact?.position || 'No position'}</Text>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {contact?.company || 'No company'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {contact?.email || 'No email'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        {contact?.phone || 'No phone'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <Button
            onClick={() => onEdit(contact)}
            className="text-primary hover:text-primary-dark p-1 rounded"
            variant="ghost"
            icon="Edit"
            iconSize={16}
          />
          <Button
            onClick={() => onDelete(contact?.id)}
            className="text-red-600 hover:text-red-900 p-1 rounded"
            variant="ghost"
            icon="Trash2"
            iconSize={16}
          />
        </div>
      </td>
    </>
  );

  const emptyMessage = {
    icon: 'Users',
    title: 'No contacts found',
    description: 'Get started by adding your first contact.'
  };

  const emptyAction = {
    label: 'Add Contact',
    onClick: onAddContact
  };

  return (
    <Table
      headers={headers}
      data={contacts}
      renderRow={renderContactRow}
      onSort={onSort}
      sortField={sortField}
      sortDirection={sortDirection}
      isLoading={isLoading}
      emptyMessage={emptyMessage}
      emptyAction={emptyAction}
    />
  );
};

export default ContactsTable;