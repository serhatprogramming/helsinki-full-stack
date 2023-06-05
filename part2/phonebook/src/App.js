import { useState, useEffect } from "react";

import phoneService from "./services/persons";

import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phoneService.getPersons().then((persons) => setPersons(persons));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phoneService
          .updatePerson({
            ...persons.find((person) => person.name === newName),
            number: newNumber,
          })
          .then((person) =>
            setPersons(persons.map((p) => (p.id === person.id ? person : p)))
          );
      }
    } else {
      phoneService
        .addPerson({ name: newName, number: newNumber })
        .then((person) => setPersons((persons) => [...persons, person]));
    }
    setNewName("");
    setNewNumber("");
  };

  const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService
        .removePerson(person)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
