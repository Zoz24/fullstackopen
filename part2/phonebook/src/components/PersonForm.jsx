import { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({
  persons,
  setPersons,
  setNotificationMsg,
  setNotificationType,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const replaceNumber = (personObject) => {
    const existingPerson = persons.find(
      (person) => person.name === personObject.name
    );
    if (
      existingPerson &&
      window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .update(existingPerson.id, personObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          );
        })
        .catch((error) => {
          setNotificationType("error");
          setNotificationMsg(
            `Information of ${existingPerson.name} has already been removed from server`
          );
          setTimeout(() => {
            setNotificationMsg(null);
            setNotificationType(null);
          }, 5000);
          setPersons(
            persons.filter((person) => person.id !== existingPerson.id)
          );
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    if (persons.some((person) => person.name === personObject.name)) {
      replaceNumber(personObject);
    } else {
      personService
        .create(personObject)
        .then((initialPerson) => {
          setPersons(persons.concat(initialPerson));
          setNotificationType("notification");
          setNotificationMsg(`Added ${personObject.name}`);
          setTimeout(() => {
            setNotificationMsg(null);
            setNotificationType(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationType("error");
          setNotificationMsg(error.response.data.error);
          setTimeout(() => {
            setNotificationMsg(null);
            setNotificationType(null);
          }, 5000);
        });
      setNewName("");
      setNewNumber("");
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonChange} />
      </div>
      <div>
        number <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
