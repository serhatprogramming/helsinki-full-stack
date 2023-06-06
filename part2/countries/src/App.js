import { useState, useEffect } from "react";
import axios from "axios";

const OneCountry = ({ country }) => {
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
