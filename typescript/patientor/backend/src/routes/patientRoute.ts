import express from "express";
import {
  getPatients,
  addPatient,
  getPatient,
} from "../services/patientService";
import { toNewPatientEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.get("/:id", (req, res) => {
  try {
    const paramId = req.params.id;
    const currentPatient = getPatient(paramId);
    res.json(currentPatient);
  } catch (e: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;
