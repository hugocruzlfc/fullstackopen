import { useState } from "react";
import { useQuery } from "@apollo/client";
import "./App.css";
import Persons from "./components/Person";
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";

import { ALL_PERSONS } from "./queries";

function App() {
  const result = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null);
  // console.log(result);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Notify errorMessage={errorMessage} />
        <Persons persons={result.data.allPersons} />
        <PersonForm setError={notify} />
        <PhoneForm setError={notify} />
      </header>
    </div>
  );
}

export default App;
