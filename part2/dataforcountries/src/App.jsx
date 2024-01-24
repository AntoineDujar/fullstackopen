import { useState, useEffect } from 'react'
import axios from 'axios'


const Countries = ({countryData, countryInput}) => {
  const [iCountry, setICountry] = useState('')

  const filtered = countryData.filter((country) => {
    return (
      country.name.common.toLowerCase().includes(countryInput.toLowerCase())
    )
  })

  if (filtered.length === 1) {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/name/" + filtered[0].name.common)
      .then(response => {
        // console.log(response.data)
        setICountry(response.data)
      })
      .catch(response => {
        console.log('problem with individual api')
        console.log(response)
      })
    return (
      <> 
        <h2>{iCountry.name.common}</h2>
      </>
    )
  }
  else if (filtered.length <= 10) {
    return(
      <ul>
      {filtered.map((country) => {
        return (
          <li>
            <p>
              {country.name.common}
            </p>
          </li>
        )
      })}
      </ul>
    )
  } else {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }

}

function App() {
  const [countryInput, setCountryInput] = useState('')
  const [countryData, setCountryData] = useState(null)
  
  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountryData(response.data)
      })
  }, [])


  const handleInputChange = (event) => {
    const input = event.target.value
    setCountryInput(input)
  }

  if (!countryData) {
    return null
  }

  return (
    <>
      <div style={{display: 'flex'}}>
        <p>Country Search:</p>
        <input type="text" value={countryInput} onChange={handleInputChange} />
      </div>
      <Countries countryData={countryData} countryInput={countryInput}/>
    </>
  )
}

export default App
