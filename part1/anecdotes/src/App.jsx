import { useState } from 'react'

const Points = (props) => {
  return (
    <p>has {props.points} votes</p>
  )
}

const AnecdoteMostVotes = (props) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      {props.anecdoteMostVotes}
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(8))
  const [mostVoted, setMostVoted] = useState(0)
  

  const handleAnecdoteChange = () => {
    let newNumber = Math.floor(Math.random() * anecdotes.length)
    console.log(newNumber)
    setSelected(newNumber)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] = copy[selected] + 1
    // console.log(copy)
    setPoints(copy) 
    const largest = Math.max(...copy)
    // console.log('largest', largest)
    setMostVoted(largest)
    const largestVoted = copy.indexOf(largest)
    // console.log('largestVoted', largestVoted)
    // console.log('copy', copy)
    setMostVoted(largestVoted)
  }

  return (
    <div>
      {anecdotes[selected]}
      <Points points={points[selected]} />
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleAnecdoteChange}>next anecdote</button>
      </div>
      <AnecdoteMostVotes anecdoteMostVotes={anecdotes[mostVoted]}/>
      <Points points={points[mostVoted]}/>
    </div>
  )
}

export default App