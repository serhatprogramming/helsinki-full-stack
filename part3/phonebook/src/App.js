import { useState, useEffect } from "react";

import phoneService from "./services/persons";

import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phoneService.getPersons().then((persons) => setPersons(persons));
  }, []);

  const displayNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const alreadyExist = persons.find((person) => person.name === newName);
    if (alreadyExist) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        phoneService
          .updatePerson({
            ...alreadyExist,
            number: newNumber,
          })
          .then((person) => {
            displayNotification(
              `${person.name}'s number is updated as ${person.number}`,
              "info"
            );
            setPersons(persons.map((p) => (p.id === person.id ? person : p)));
          })
          .catch((err) => {
            displayNotification(
              `information of ${alreadyExist.name} is already removed from server`,
              "error"
            );
            setPersons(persons.filter((p) => p.id !== alreadyExist.id));
          });
      }
    } else {
      phoneService
        .addPerson({ name: newName, number: newNumber })
        .then((person) => {
          displayNotification(
            `${person.name} added to phonebook with number ${person.number}`,
            "info"
          );
          setPersons((persons) => [...persons, person]);
        })
        .catch((err) => {
          console.log("error adding", err);
          displayNotification("Missing Field", "error");
        });
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
        .then(() => {
          displayNotification(`${person.name} deleted`, "warning");
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((err) => {
          displayNotification(
            `information of ${person.name} is already removed from server`,
            "error"
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
