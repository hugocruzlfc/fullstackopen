import React from "react";
import { Gender, PatientFormValues } from "../../types";
import { Field, Formik } from "formik";
import { Button, FormGroup, Grid } from "@mui/material";
import { TextField, SelectField } from "../FormField";
import { genderOptions } from "../../helpers";

export interface AddPatientFormikProps {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const INITIAL_VALUES = {
  name: "",
  ssn: "",
  dateOfBirth: "",
  occupation: "",
  gender: Gender.Other,
};

const AddPatientFormik: React.FC<AddPatientFormikProps> = ({
  onSubmit,
  onCancel,
}) => {
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.ssn) {
          errors.ssn = requiredError;
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.occupation) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <FormGroup>
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Social Security Number"
              placeholder="SSN"
              name="ssn"
              component={TextField}
            />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextField}
            />
            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            />
            <SelectField
              label="Gender"
              name="gender"
              options={genderOptions}
            />
            <Grid
              container
              rowSpacing={1}
              sx={{ mt: 2 }}
            >
              <Grid
                item
                xs={6}
              >
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                style={{ textAlign: "right" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </FormGroup>
        );
      }}
    </Formik>
  );
};

export default AddPatientFormik;
