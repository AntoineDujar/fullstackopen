import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  if (all <= 0) {
    return(
      <p>
        No feedback given
      </p>
    )
  }
  return(
    <>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={(props.good + props.bad*-1) / all}/>
      <StatisticLine text="positive" value={props.good / all * 100}/>
     </>
  )
}

const Header = (props) => {
  return(
    <h1>
      {props.text}
    </h1>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={"give feedback"}/>
      <Button text={"good"} onClick={() => {setGood(good+1)}}/>
      <Button text={"neutral"} onClick={() => {setNeutral(neutral+1)}}/>
      <Button text={"bad"} onClick={() => {setBad(bad+1)}}/>
      <Header text={"statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App