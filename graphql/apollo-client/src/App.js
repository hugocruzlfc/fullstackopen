import { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import "./App.css";
import Persons from "./components/Person";
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";

import { ALL_PERSONS } from "./queries";

function App() {
  const [token, setToken] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState(null);
  // console.log(result);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <Notify errorMessage={errorMessage} />
        <button onClick={logout}>logout</button>
        <Persons persons={result.data.allPersons} />
        <PersonForm setError={notify} />
        <PhoneForm setError={notify} />
      </header>
    </div>
  );
}

export default App;
