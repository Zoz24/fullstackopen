import { useState } from 'react'
import axios from 'axios'

function App() {

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"

  const [countries, setCountries] = useState([])

  const getCountries = () => {
    const url = `${baseUrl}/api/all`
    axios.get(url).then(response => {
      if (response.data.length > 10) {
        console.log("Too many matches, specify another filter")
      }
      if (response.data.length < 10 && response.data.length > 1) {
        setCountries(response.data)
      }
    })
  }

  return (
    <>
    <div>find countries <input onChange={getCountries} /></div>
    {countries.map(country => (
        <div key={country.alpha2Code}>{country.name}</div>
      ))}
    </>
  )
}

export default App
