const Header = ({ course }) => {
  return <h2><u>{course}</u></h2>
}

const Part = ({ name, exercises }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({ parts }) => {
  console.log('Kurssin osat | ', parts)
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const TotalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  console.log('Kaikki tehtävät | ', TotalExercises)
  return <p>Yhteensä {TotalExercises} tehtävää!</p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course