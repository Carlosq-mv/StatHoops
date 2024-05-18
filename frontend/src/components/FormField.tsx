import React from 'react'
import { FormControl, Input, InputLabel, InputAdornment, SvgIconProps } from '@mui/material'


interface FormFieldProps {
    id: string;
    label: string;
    value: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    startAdornment: React.ReactElement<SvgIconProps>;
}
  
const FormField = ({ id, label, value, onChange, startAdornment, type }: FormFieldProps) => {
    return (
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input
          type={type}
          id={id}
          name={id}
          startAdornment={<InputAdornment position="start">{startAdornment}</InputAdornment>}
          value={value}
          onChange={onChange}
        />
      </FormControl>
    );
};
  
export default FormField;

