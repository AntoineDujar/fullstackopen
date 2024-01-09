const Person = ({id, name, number, handleDelete}) => {
    return (
      <li key={id}>
        {name} {number}
        <button onClick={() => handleDelete(id)}>Delete</button>
      </li>
    )
  }

const People = ({ persons, newSearch, handleDelete}) => {
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
            <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDelete={handleDelete}/>
        )}
        </ul>
    );
};

export default People
  