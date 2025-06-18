import { useState, useEffect } from 'react'
import axios from 'axios'

const MaanTiedot = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!country.capital) return

    const api_key = import.meta.env.VITE_SOME_KEY
    const capital = country.capital[0]
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`

    axios.get(url).then(response => {
      setWeather(response.data)
    })
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Pääkaupunki: {country.capital?.[0]}</p>
      <p>Pinta-ala: {country.area} km²</p>

      <h3>Kielet:</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />

      {weather && (
        <>
          <h3>Sää kohteessa {country.capital[0]}</h3>
          <p>Lämpötila: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Tuuli: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  )
}

const MaaLista = ({ countries, onShow }) => {
  if (countries.length > 10) {
    return <p>Liian monta osumaa, rajaa hakuasi</p>
  } else if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}{' '}
            <button onClick={() => onShow(country)}>Näytä</button>
          </li>
        ))}
      </ul>
    )
  } else if (countries.length === 1) {
    return <MaanTiedot country={countries[0]} />
  } else {
    return <p>Ei osumia</p>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Maiden tietoja</h1>
      <div>
        Etsi maa (Englanniksi): <input value={filter} onChange={handleFilterChange} />
      </div>

      {selectedCountry
        ? <MaanTiedot country={selectedCountry} />
        : <MaaLista countries={filteredCountries} onShow={setSelectedCountry} />
      }
    </div>
  )
}

export default App
