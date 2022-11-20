import { useState, useEffect } from "react";
//import axios from "axios";

import directoryService from "./utils/services";

import AddForm from "./components/AddForm";
import ListUsers from "./components/ListUsers";
import FilterUser from "./components/FilterUser";
import Notification from "./components/Notification";

const INITIAL_STATE = {
  name: "",
  number: "",
};

const TYPENOTIFICATION = {
  success: "success",
  error: "error",
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [personRegister, setPersonRegister] = useState(INITIAL_STATE);
  const [typeNotification, setTypeNotification] = useState(
    TYPENOTIFICATION.success
  );

  useEffect(() => {
    // console.log("effect");
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   console.log("promise fulfilled");
    //   setPersons(response.data);
    // });

    directoryService.getPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // const changeUser = () => {
  //   // setUser((user.name = input));
  //   // setUser((prev) => (prev.name = input));
  //   setUser((prev) => ({ ...prev, name: input }));
  // };

  const handleChange = (e) => {
    setPersonRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = (selectPerson) => {
    if (window.confirm(`Do you really delete to ${selectPerson.name}?`)) {
      directoryService.deletePerson(selectPerson.id).then((dPerson) => {
        setPersons(persons.filter((person) => person.id !== selectPerson.id));
      });
    }
  };

  const handleUpdateNumber = (selectedPerson) => {
    const person = persons.find((p) => p.name === selectedPerson.name);
    const changedPerson = { ...person, number: selectedPerson.number };

    directoryService
      .updateNumber(changedPerson.id, changedPerson)
      .then((updatePerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== changedPerson.id ? person : updatePerson
          )
        );
        setPersonRegister(INITIAL_STATE);
        setErrorMessage("Number updated correctly");
        setTypeNotification(TYPENOTIFICATION.success);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
        setTypeNotification(TYPENOTIFICATION.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === personRegister.name)) {
      // alert(`${personRegister.name} is already added to phonebook`);
      if (
        window.confirm(`${personRegister.name} is already added to phonebook`)
      ) {
        handleUpdateNumber(personRegister);
      }
    } else {
      // const newPerson = {
      //   name: newName,
      //   number: newNumber,
      // };
      // setPersons([...persons, { name: newName, number: newNumber }]);
      directoryService
        .create(personRegister)
        .then((person) => {
          // setNotes(notes.concat(response.data));
          setPersons([...persons, person]);
          setPersonRegister(INITIAL_STATE);
          setErrorMessage(`Added ${person.name}`);
          setTypeNotification(TYPENOTIFICATION.success);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.message);
          setTypeNotification(TYPENOTIFICATION.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        });
    }
  };

  const handleFilter = (e) => {
    const inputName = e.target.value;
    const arr = persons.filter(
      (person) =>
        person.name.toLowerCase() === inputName || person.name === inputName
    );
    if (arr.length !== 0) {
      setPersons(arr);
    }
  };

  return (
    <div>
      <Notification
        message={errorMessage}
        typeNotification={typeNotification}
      />
      <h2>Phonebook</h2>
      <FilterUser handleFilter={handleFilter} />
      <AddForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        personRegister={personRegister}
      />
      <ListUsers
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
