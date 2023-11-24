import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types/Patient";
import PatientItem from "../components/PatientItem";

export interface PatientInfoProps {}

const PatientInfo: React.FC<PatientInfoProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const currentPatient = await patientService.getPatientById(
          id as string
        );
        setPatient(currentPatient);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, []);

  return <PatientItem patient={patient} />;
};

export default PatientInfo;
