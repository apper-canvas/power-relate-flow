import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const ActivityForm = ({
  formState,
  setFormState,
  contacts,
  deals,
  onSubmit,
  onCancel
}) => {
  const activityTypes = [
    { value: 'call', label: 'Phone Call' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'email', label: 'Email' },
    { value: 'note', label: 'Note' },
  ];

  const contactOptions = [{ value: '', label: 'Select Contact' }, ...contacts.map(c => ({
    value: c?.id,
    label: `${c?.firstName || ''} ${c?.lastName || ''}`.trim() || 'Unknown Contact'
  }))];

  const dealOptions = [{ value: '', label: 'Select Deal (Optional)' }, ...deals.map(d => ({
    value: d?.id,
    label: d?.title || 'Untitled Deal'
  }))];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        type="select"
        label="Activity Type"
        name="type"
        value={formState.type}
        onChange={(e) => setFormState({ ...formState, type: e.target.value })}
        options={activityTypes}
      />
      <FormField
        type="text"
        label="Subject"
        name="subject"
        placeholder="Subject"
        value={formState.subject}
        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
        required
      />
      <FormField
        type="textarea"
        label="Description"
        name="description"
        placeholder="Description"
        value={formState.description}
        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
        rows={3}
      />
      <FormField
        type="select"
        label="Contact"
        name="contactId"
        value={formState.contactId}
        onChange={(e) => setFormState({ ...formState, contactId: e.target.value })}
        options={contactOptions}
        required
      />
      <FormField
        type="select"
        label="Deal (Optional)"
        name="dealId"
        value={formState.dealId}
        onChange={(e) => setFormState({ ...formState, dealId: e.target.value })}
        options={dealOptions}
      />
      <FormField
        type="number"
        label="Duration (minutes)"
        name="duration"
        placeholder="Duration (minutes)"
        value={formState.duration}
        onChange={(e) => setFormState({ ...formState, duration: parseInt(e.target.value) })}
      />
      <div className="flex space-x-3">
        <Button type="submit" className="flex-1">
          Log Activity
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;