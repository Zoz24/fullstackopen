import { useState } from "react";

const Filter = ({ persons, setPersons }) => {
  const filterPersons = (event) => {
    const filterText = event.target.value;
    filterText
      ? setPersons(
          persons.filter((person) =>
            person.name.toLowerCase().includes(event.target.value.toLowerCase())
          )
        )
      : setPersons(persons);
  };

  return (
    <div>
      filter shown with <input onChange={filterPersons} />
    </div>
  );
};

export default Filter;
