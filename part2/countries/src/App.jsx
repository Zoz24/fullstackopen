import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";

  const [countriesAll, setCountriesAll] = useState([]);
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(baseUrl + "api/all")
      .then((response) => {
        setCountriesAll(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const getCountries = (event) => {
    const filterText = event.target.value.toLowerCase();

    // If the input is empty, clear countries and message
    if (!filterText) {
      setCountries([]);
      setMessage("");
      return; // Exit the function early
    }
    const filteredCountries = countriesAll.filter(
      (country) =>
        typeof country.name.common === "string" &&
        country.name.common.toLowerCase().includes(filterText)
    );

    if (filteredCountries.length > 10) {
      setMessage("Too many matches, specify another filter");
      setCountries([]); // Clear the displayed countries if there are too many matches
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 0) {
      setMessage("");
      setCountries(filteredCountries);
    } else {
      setMessage("No matches found");
      setCountries([]); // Clear the displayed countries if no matches
    }
  };

  return (
    <>
      <div>
        find countries <input onChange={getCountries} />
      </div>
      {message && <div>{message}</div>}
      {countries.map((country) => (
        <div key={country.cca2}>{country.name.common}</div>
      ))}
    </>
  );
};

export default App;
