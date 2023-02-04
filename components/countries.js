import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CountryPage = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setCountry(data[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [name]);

  return (
    <div className="country-container">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && country && (
        <>
          <img src={country.flag} alt="flag" />
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population.toLocaleString()}</p>
        </>
      )}
    </div>
  );
};

export default CountryPage;
