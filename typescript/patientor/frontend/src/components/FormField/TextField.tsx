import React from "react";
import { FormControl, Input, InputLabel } from "@mui/material";
import { ErrorMessage, Field } from "formik";

export interface TextFieldProps {
  label: string;
  placeholder: string;
  field: any;
}

const TextField: React.FC<TextFieldProps> = ({ field, label, placeholder }) => {
  return (
    <FormControl sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Input
        placeholder={placeholder}
        {...field}
      />
      <div style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </div>
    </FormControl>
  );
};

export default TextField;
