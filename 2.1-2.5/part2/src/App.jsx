import Course from './Kurssi'

const App = () => {
  const courses = [
  {
    name: 'Reactin alkeet',
    id: 1,
    parts: [
      {
        name: 'JSX |',
        exercises: 5,
        id: 1
      },
      {
        name: 'Monta komponettia | ',
        exercises: 6,
        id: 2
      },
      {
        name: 'props: tiedonvälitys komponenttien välillä |',
        exercises: 7,
        id: 3
      },
      {
        name: 'Redux |',
        exercises: 7,
        id: 4
      }
      ]
    }, 
    {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Reititys | ',
        exercises: 3,
        id: 1
      },
      {
        name: 'Väliohjelmistot | ',
        exercises: 7,
        id: 2
      }
      ]
    }
  ]

  return (
    <div>
      <h1><u>Web-Ohjelmoinnin sisältö</u></h1>
      <p>Kurssin aihe | Tehtävät</p>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App