import { Patient } from "../types/Patient";
import { toNewPatientEntry } from "../utils";

// const patients: Array<Patient>
// const data = [
//   {
//     id: "d2773336-f723-11e9-8f0b-362b9e155667",
//     name: "John McClane",
//     dateOfBirth: "1986-07-09",
//     ssn: "090786-122X",
//     gender: "male",
//     occupation: "New york city cop",
//     entries: [],
//   },
//   {
//     id: "d2773598-f723-11e9-8f0b-362b9e155667",
//     name: "Martin Riggs",
//     dateOfBirth: "1979-01-30",
//     ssn: "300179-77A",
//     gender: "male",
//     occupation: "Cop",
//     entries: [],
//   },
//   {
//     id: "d27736ec-f723-11e9-8f0b-362b9e155667",
//     name: "Hans Gruber",
//     dateOfBirth: "1970-04-25",
//     ssn: "250470-555L",
//     gender: "male",
//     occupation: "Technician",
//     entries: [],
//   },
//   {
//     id: "d2773822-f723-11e9-8f0b-362b9e155667",
//     name: "Dana Scully",
//     dateOfBirth: "1974-01-05",
//     ssn: "050174-432N",
//     gender: "female",
//     occupation: "Forensic Pathologist",
//     entries: [],
//   },
//   {
//     id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
//     name: "Matti Luukkainen",
//     dateOfBirth: "1971-04-09",
//     ssn: "090471-8890",
//     gender: "male",
//     occupation: "Digital evangelist",
//     entries: [],
//   },
// ];

const data = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: "male",
    occupation: "New york city cop",
    entries: [
      {
        id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
        date: "2015-01-02",
        type: "Hospital",
        specialist: "MD House",
        diagnosisCodes: ["S62.5"],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: "2015-01-16",
          criteria: "Thumb has healed.",
        },
      },
      {
        id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
        date: "2019-08-05",
        type: "OccupationalHealthcare",
        specialist: "MD House",
        employerName: "HyPD",
        diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"],
        description:
          "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ",
        sickLeave: {
          startDate: "2019-08-05",
          endDate: "2019-08-28",
        },
      },
    ],
  },
  {
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: "male",
    occupation: "Cop",
    entries: [
      {
        id: "8e7d1447-672a-4ab1-8491-8440e7f37723",
        date: "2016-03-14",
        type: "HealthCheck",
        specialist: "Dr. Smith",
        diagnosisCodes: ["I10"],
        description: "Routine checkup. Patient in good health.",
        healthCheckRating: 0,
      },
      {
        id: "f98f470f-5c3c-49ec-aa7d-5b7643a02b0a",
        date: "2017-07-22",
        type: "Hospital",
        specialist: "Dr. Johnson",
        diagnosisCodes: ["J45.1"],
        description: "Treatment for asthma exacerbation. Improvement observed.",
        discharge: {
          date: "2017-08-05",
          criteria: "Breathing stabilized.",
        },
      },
    ],
  },
  {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: "male",
    occupation: "Technician",
    entries: [
      {
        id: "7f3e5462-9b1c-4f98-8d34-10f85c1c5815",
        date: "2018-05-10",
        type: "OccupationalHealthcare",
        specialist: "Dr. Anderson",
        diagnosisCodes: ["M54.4"],
        description: "Back pain assessment. Prescribed physical therapy.",
        employerName: "FBI",
        sickLeave: {
          startDate: "2018-05-25",
          endDate: "2018-06-08",
        },
      },
    ],
  },
  {
    id: "d2773822-f723-11e9-8f0b-362b9e155667",
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: "female",
    occupation: "Forensic Pathologist",
  },
  {
    id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: "male",
    occupation: "Digital evangelist",
    entries: [
      {
        id: "62b41a06-82af-4c35-bc7d-d7ee0863fb15",
        date: "2019-09-18",
        type: "Hospital",
        specialist: "Dr. Martinez",
        diagnosisCodes: ["G20"],
        description: "Parkinson's disease assessment. Medication prescribed.",
        discharge: {
          date: "2019-10-02",
          criteria: "Medication provided. Follow-up appointment scheduled.",
        },
      },
    ],
  },
];

const patients: Patient[] = data.map((obj) => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

export default patients;
