import axios from "axios";
import { useEffect, useState } from "react";

const CountryDetails = ({ country }) => {
  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [country]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        <strong>Capital:</strong> {country.capital}
      </p>
      <p>
        <strong>Area Code:</strong> {country.area}
      </p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flag.alt} width="200" />

      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>
            <strong>Temperature:</strong> {weather.main.temp} °C
          </p>
          <p>
            <strong>Weather:</strong> {weather.weather[0].description}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>
            <strong>Wind:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
