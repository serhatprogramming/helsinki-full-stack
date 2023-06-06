import { useState, useEffect } from "react";
import axios from "axios";

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
        (foundCountries.length > 0 && foundCountries.length < 10 ? (
          foundCountries.map((country) => (
            <>
              <br />
              {country.name.common}
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
        ) : null)}
    </div>
  );
};

export default App;
