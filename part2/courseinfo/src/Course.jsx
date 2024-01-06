const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.id} part={part}/>)}
  </>

const ExercisesSum = ({ parts }) => {
  let exerciseCount = parts.map(part => part.exercises)
  // console.log(exerciseCount)
  let totalExercise = parts.reduce((sum, part) => sum + part.exercises, 0)
  // console.log(totalExercise)
  return (
    <p><b>total of {totalExercise} exercises</b></p>
  )
}

const Course = ({course}) =>
  <>
    {course.map(course =>
    <div key={course.id}>
      <Header key={'Header'+course.id} course={course.name}/>
      <Content key={'Content'+course.id} parts={course.parts}/>
      <ExercisesSum key={'ExercisesSum'+course.id} parts={course.parts}/>
    </div>
    )}
  </>

  export default Course