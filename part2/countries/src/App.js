import { useState, useEffect } from "react";
import axios from "axios";

const OneCountry = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "MB9eWU03phPl0ImLsRNGEGL7LiyG9oNm";
  useEffect(() => {
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${country.latlng[0]},${country.latlng[1]}`
      )
      .then((res) => {
        console.log(res.data.Key);
        axios
          .get(
            `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${res.data.Key}?apikey=${API_KEY}&details=true`
          )
          .then((res) => {
            console.log(res.data.DailyForecasts[0]);
            setWeatherData(res.data.DailyForecasts[0]);
          })
          .catch((err) => {
            console.log(err); //
            setWeatherData(null);
          });
      })
      .catch((err) => {
        console.log(err); //
        setWeatherData(null);
        console.log(country.latlng);
      });
  }, [country.latlng]);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital[0]} <br />
        area {country.area}
      </p>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <h2>Weather in {country.capital[0]}</h2>
      {weatherData && (
        <>
          <p>temperature {weatherData.Temperature.Maximum.Value} Fahrenheit</p>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${
              Number(weatherData.Day.Icon) < 10
                ? `0${weatherData.Day.Icon}`
                : `${weatherData.Day.Icon}`
            }-s.png`}
            alt=""
          />
          <p>wind {weatherData.Day.Wind.Speed.Value} mph</p>
        </>
      )}
    </div>
  );
};

const ItemCountry = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      {country.name.common}{" "}
      <button onClick={handleShow}>{!show ? "show" : "hide"}</button>
      {show && <OneCountry country={country} />}
    </>
  );
};

const App = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [countries, setCountries] = useState(null);
  const [foundCountries, setFoundCountries] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
        console.log(res.data);
      });
  }, []);

  const findCountry = (e) => {
    setSearchCountry(e.target.value);
    setFoundCountries(
      countries &&
        countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
    );
  };

  return (
    <div>
      find countries{" "}
      <input type="text" value={searchCountry} onChange={findCountry} />
      {foundCountries &&
        (foundCountries.length > 1 && foundCountries.length <= 10 ? (
          foundCountries.map((country) => (
            <>
              <br />
              <ItemCountry country={country} />
            </>
          ))
        ) : foundCountries.length > 10 ? (
          <>
            <br />
            Too many matches, specify another filter
          </>
        ) : foundCountries.length === 0 ? (
          <>
            <br />
            No matches found
          </>
        ) : foundCountries.length === 1 ? (
          <OneCountry country={foundCountries[0]} />
        ) : null)}
    </div>
  );
};

export default App;
