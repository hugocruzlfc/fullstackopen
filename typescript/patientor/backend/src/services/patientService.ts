/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v4 as uuidv4 } from "uuid";
import patients from "../data/patients";
import { NewPatient, Patient } from "../types";

export const getPatients = (): Patient[] => {
  return patients;
};
// export const getPatientsWithoutSsn = (): Omit<Patient, "ssn">[] => {
//   return patients.map(
//     ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
//       id,
//       name,
//       dateOfBirth,
//       gender,
//       occupation,
//       entries,
//     })
//   );
// };

export const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};
