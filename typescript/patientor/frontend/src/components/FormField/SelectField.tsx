import React from "react";
import { GenderOption } from "../../types";
import { Field } from "formik";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export interface SelectFieldProps {
  name: string;
  label: string;
  options: GenderOption[];
}

const SelectField: React.FC<SelectFieldProps> = ({ name, label, options }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select name={name}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label || option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
