import { useState, useEffect } from "react";
import peopleService from './services/people'
import People from './People'
import PeopleForm from './PeopleForm'
import Filter from './Filter'

const ErrorMsg = ({ message }) => {

  const notiStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16
  }

  if (message === null) {
    return null
  }

  return (
    <div className='error' style={notiStyle}>
      {message}
    </div>
  )
}
const Notification = ({ message }) => {

  const notiStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  if (message === null) {
    return null
  }

  return (
    <div className='error' style={notiStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [errormsg, setErrormsg] = useState(null);

  useEffect(() => {
    // console.log('effect')
    peopleService
      .getAll()
      .then(response => {
        // console.log('promise fulfulled')
        setPersons(response)
      })
  }, [])

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
    };
    let foundID = -1
    let present = persons.reduce((flag, person) => {
      if (person.name === personObject.name) {
        flag = true;
        foundID = person.id
      }
      return flag;
    }, false);
    // console.log(present)

    if (!present) {
      peopleService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");

          setNotification(
            `Note '${personObject.name}' was added to server`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log('problem with post')
        })
    } else {
        if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number?`)) {
          // alert(`${newName} is already added to phonebook`);
          console.log(`foundID: ${foundID}`)
          peopleService
            .update(foundID, personObject)
            .then(response => {
              setPersons(persons.map(person => person.id !== foundID ? person : response))
            })
            .catch(response => {
              setErrormsg(
                `Note '${personObject.name}' has already been removed from the server`
              )
              setTimeout(() => {
                setErrormsg(null)
              }, 5000)
            })
        }
    }
  };

  const handleDelete = (id) => {
    const currentPerson = persons.find(p => p.id === id)
    if (window.confirm(`Do you want to delete ${currentPerson.name}?`)) {
      peopleService
        .deletePerson(id)
        .then(response => {
          // console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMsg message={errormsg} />
      <Notification message={notification} />
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
      <People persons={persons} newSearch={newSearch} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;
