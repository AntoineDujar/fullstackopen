import { useState } from "react";

const Filter = ({newSearch, handleSearchChange}) => {
  return (
    <div>
        filter shown with:
        <input value={newSearch} onChange={handleSearchChange} />
    </div>
  )
}

const PeopleForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({id, name, number}) => {
  return (
    <li key={id}>
      {name} {number}
    </li>
  )
}

const People = ({ persons, newSearch }) => {
  // console.log(newSearch)
  let filtered = persons.filter((person) => {
    return (
      newSearch.toLowerCase() ===
      person.name.slice(0, newSearch.length).toLowerCase()
    );
  });

  return (
    <ul>
      {filtered.map((person) =>
        <Person key={person.id} id={person.id} name={person.name} number={person.number} />
      )}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let present = persons.reduce((flag, person) => {
      if (person.name === personObject.name) {
        flag = true;
      }
      return flag;
    }, false);
    // console.log(present)

    if (!present) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PeopleForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <People persons={persons} newSearch={newSearch} />
    </div>
  );
};

export default App;
