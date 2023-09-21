import Person from "./Person";

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name.length + Math.random()}
          name={person.name}
          number={person.number}
        />
      ))}
    </ul>
  );
};

export default Persons;
