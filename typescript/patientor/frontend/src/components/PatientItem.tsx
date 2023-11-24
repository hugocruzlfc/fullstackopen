import React, { useMemo } from "react";
import { Patient } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { useStateValue } from "../state";
import EntrySpecificDetails from "./EntrySpecificDetails";

export interface PatientItemProps {
  patient: Patient | undefined;
}

const PatientItem: React.FC<PatientItemProps> = ({ patient }) => {
  const [, , diagnosis] = useStateValue();

  console.log(patient);

  const patientDiagnosisCodes = patient?.entries
    .map((entry) => entry.diagnosisCodes)
    .flat();

  const diagnosisCodesAndNames = useMemo(() => {
    return patientDiagnosisCodes?.map((code) => {
      const diagnosisByCode = diagnosis.find((d) => d.code === code);
      return {
        code,
        name: diagnosisByCode?.name,
      };
    });
  }, [patientDiagnosisCodes, diagnosis]);

  return (
    <Card sx={{ marginTop: 5 }}>
      <CardHeader
        title={patient?.name}
        action={patient?.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          ssn: {patient?.ssn}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          occupation: {patient?.occupation}
        </Typography>
        <Typography
          sx={{ marginTop: 3 }}
          variant="h6"
        >
          entries
        </Typography>
        <Stack
          direction="row"
          spacing={2}
        >
          <List>
            {patient?.entries.map((entry) => (
              <React.Fragment key={entry.id}>
                <ListItem disablePadding>
                  <Typography
                    variant="body2"
                    sx={{ marginRight: 2 }}
                  >
                    {entry.date}
                  </Typography>
                  <EntrySpecificDetails entry={entry} />
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="body2">{entry.description}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <List>
                    {diagnosisCodesAndNames?.map(({ code, name }) => (
                      <ListItem key={code}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {code}: {name}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PatientItem;
