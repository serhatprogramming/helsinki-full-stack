import React from "react";

const Persons = ({ filterPersons }) => {
  return (
    <div>
      {filterPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
