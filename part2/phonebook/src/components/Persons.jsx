import Person from "./Person";
import personservice from "../services/persons";

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name.length + Math.random()}
          name={person.name}
          number={person.number}
          onDelete={() => {
            if (window.confirm(`Delete ${person.name}?`)) {
              personservice.deletePerson(person.id);
              window.location.reload();
            }
          }}
        />
      ))}
    </ul>
  );
};

export default Persons;
