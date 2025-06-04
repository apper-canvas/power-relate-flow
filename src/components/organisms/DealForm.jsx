import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const DealForm = ({
  formState,
  setFormState,
  contacts,
  onSubmit,
  onCancel,
  isEditing
}) => {
  const dealStages = [
    { value: 'prospect', label: 'Prospect' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed', label: 'Closed' },
  ];

  const contactOptions = [{ value: '', label: 'Select Contact' }, ...contacts.map(c => ({
    value: c?.id,
    label: `${c?.firstName || ''} ${c?.lastName || ''}`.trim() || 'Unknown Contact'
  }))];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        type="text"
        label="Deal Title"
        name="title"
        placeholder="Deal Title"
        value={formState.title}
        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
        required
      />
      <FormField
        type="number"
        label="Deal Value"
        name="value"
        placeholder="Deal Value"
        value={formState.value}
        onChange={(e) => setFormState({ ...formState, value: e.target.value })}
        required
      />
      <FormField
        type="select"
        label="Stage"
        name="stage"
        value={formState.stage}
        onChange={(e) => setFormState({ ...formState, stage: e.target.value })}
        options={dealStages}
      />
      <FormField
        type="select"
        label="Associated Contact"
        name="contactId"
        value={formState.contactId}
        onChange={(e) => setFormState({ ...formState, contactId: e.target.value })}
        options={contactOptions}
        required
      />
      <FormField
        type="range"
        label="Probability"
        name="probability"
        value={formState.probability}
        onChange={(e) => setFormState({ ...formState, probability: parseInt(e.target.value) })}
        min="0"
        max="100"
      />
      <FormField
        type="date"
        label="Expected Close Date"
        name="expectedCloseDate"
        value={formState.expectedCloseDate}
        onChange={(e) => setFormState({ ...formState, expectedCloseDate: e.target.value })}
      />
      <FormField
        type="textarea"
        label="Notes"
        name="notes"
        placeholder="Notes"
        value={formState.notes}
        onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
        rows={3}
      />
      <div className="flex space-x-3">
        <Button type="submit" className="flex-1">
          {isEditing ? 'Update' : 'Create'} Deal
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DealForm;