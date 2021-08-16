import { ChangeEvent, FC, ReactNode } from 'react';
import { FormGroup, InputLabel, Select, MenuItem } from '@material-ui/core';
interface Option {
  key: string;
  value?: string | number | readonly string[];
}

interface OptionFormGroupProps {
  id?: string;
  value: string | number | readonly string[];
  label: string;
  options: Option[];
  name?: string;
  onChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    child: ReactNode
  ) => void;
  required: boolean;
  placeholder?: string;
}

const OptionFormGroup: FC<OptionFormGroupProps> = ({
  options,
  id,
  value,
  required,
  name,
  label,
  placeholder,
  onChange
}) => {
  const selectOptions = options.map(({ key, value }) => <MenuItem value={key}>{value}</MenuItem>);
  return (
    <FormGroup style={{ width: '47%' }}>
      {label && <InputLabel style={{ fontSize: '12px' }}>{label}</InputLabel>}
      <Select
        placeholder={placeholder}
        name={name}
        labelId='demo-simple-select-label'
        id={id}
        required={required}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </Select>
    </FormGroup>
  );
};

export { OptionFormGroup };
