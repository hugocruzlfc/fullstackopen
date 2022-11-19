import { useState, useEffect } from "react";
import axios from "axios";

import AddForm from "./components/AddForm";
import ListUsers from "./components/ListUsers";
import FilterUser from "./components/FilterUser";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [copyPersons, setCopyPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleName = (e) => {
    if (copyPersons.length > persons.length) {
      setPersons(copyPersons);
    }
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewNumber("");
    }
    setNewName("");
  };

  const handleFilter = (e) => {
    const inputName = e.target.value;
    const arr = persons.filter(
      (person) =>
        person.name.toLowerCase() === inputName || person.name === inputName
    );
    if (arr.length !== 0) {
      setCopyPersons(persons);
      setPersons(arr);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterUser handleFilter={handleFilter} />
      <AddForm
        handleSubmit={handleSubmit}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <ListUsers persons={persons} />
    </div>
  );
};

export default App;
