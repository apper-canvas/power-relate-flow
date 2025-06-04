import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

const ContactForm = ({
  formState,
  setFormState,
  onSubmit,
  onCancel,
  isEditing
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          type="text"
          label="First Name"
          name="firstName"
          placeholder="First Name"
          value={formState.firstName}
          onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
          required
        />
        <FormField
          type="text"
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
          required
        />
      </div>
      <FormField
        type="email"
        label="Email"
        name="email"
        placeholder="Email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
      />
      <FormField
        type="tel"
        label="Phone"
        name="phone"
        placeholder="Phone"
        value={formState.phone}
        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
      />
      <FormField
        type="text"
        label="Company"
        name="company"
        placeholder="Company"
        value={formState.company}
        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
      />
      <FormField
        type="text"
        label="Position"
        name="position"
        placeholder="Position"
        value={formState.position}
        onChange={(e) => setFormState({ ...formState, position: e.target.value })}
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
          {isEditing ? 'Update' : 'Create'} Contact
        </Button>
        <Button type="button" onClick={onCancel} variant="secondary" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;