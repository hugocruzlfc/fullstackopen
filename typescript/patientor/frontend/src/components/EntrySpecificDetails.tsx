import React from "react";
import { Entry } from "../types";
import SpaIcon from "@mui/icons-material/Spa"; //OccupationalHealthcare
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; //Hospital
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid"; //HealthCheck
import { assertNever } from "../utils";
import { Typography } from "@mui/material";

export interface EntrySpecificDetailsProps {
  entry: Entry;
}

const EntrySpecificDetails: React.FC<EntrySpecificDetailsProps> = ({
  entry,
}) => {
  // console.log(entry);
  switch (entry.type) {
    case "OccupationalHealthcare":
      return (
        <>
          <SpaIcon />
          <Typography
            variant="body2"
            sx={{ marginLeft: 1 }}
          >
            {entry.employerName}
          </Typography>
        </>
      );
    case "Hospital":
      return <LocalHospitalIcon />;
    case "HealthCheck":
      return <MedicationLiquidIcon />;
    default:
      return assertNever(entry);
  }
};

export default EntrySpecificDetails;
