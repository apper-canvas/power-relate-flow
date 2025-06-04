import React from 'react';
import Input from '../atoms/Input';
import Select from '../atoms/Select';
import Textarea from '../atoms/Textarea';
import Label from '../atoms/Label';
import Text from '../atoms/Text';

const FormField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  options = [], // For select type
  rows = 3,     // For textarea type
  min, max,     // For number/range types
  ...props
}) => {
  const id = `form-field-${name}`;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <Select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            options={options}
            required={required}
            {...props}
          />
        );
      case 'textarea':
        return (
          <Textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            required={required}
            {...props}
          />
        );
      case 'range':
        return (
          <>
            <Input
              id={id}
              type="range"
              name={name}
              value={value}
              onChange={onChange}
              min={min}
              max={max}
              required={required}
              className="mt-2"
              {...props}
            />
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {label}: {value}{type === 'range' ? '%' : ''}
            </Text>
          </>
        );
      default:
        return (
          <Input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
            {...props}
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      {label && type !== 'range' && <Label htmlFor={id}>{label}</Label>}
      {renderInput()}
    </div>
  );
};

export default FormField;