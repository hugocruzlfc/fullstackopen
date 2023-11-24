import { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { patientService } from "./services";
import PatientListPage from "./components/PatientListPage";
import { setPatientList, useStateValue } from "./state";
import PatientInfo from "./pages/PatientInfo";

const App = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const patientListFromApi = await patientService.getAll();
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography
            variant="h3"
            style={{ marginBottom: "0.5em" }}
          >
            Patientor
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path="/"
              element={<PatientListPage />}
            />
          </Routes>
          <Routes>
            <Route
              path="/patients/:id"
              element={<PatientInfo />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
