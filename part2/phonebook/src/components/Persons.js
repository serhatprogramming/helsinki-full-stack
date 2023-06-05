import React from "react";

const Persons = ({ filterPersons, handleDelete }) => {
  return (
    <div>
      {filterPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
