import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/searchStyle.css";


const Filter = () => {
    const [state, setState] = useState({
        regions: [],
        selectedRegion: 'Asia',
        countries: [],
        loading: false,
        error: null,
        currentPage: 1,
    });
    const resultsPerPage = 8;

    const { regions, selectedRegion, countries, loading, error, currentPage } = state;

    useEffect(() => {
        async function fetchData() {
            setState(prevState => ({ ...prevState, loading: true }));

            try {
                const response = await fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`);
                if (!response.ok) {
                    throw new Error("An error occurred, please try again later.");
                }
                const data = await response.json();
                setState(prevState => ({ ...prevState, countries: data, loading: false }));
            } catch (error) {
                setState(prevState => ({ ...prevState, error: error.message, loading: false }));
            }
        }

        if (selectedRegion) {
            fetchData();
        }
    }, [selectedRegion]);

    useEffect(() => {
        async function fetchRegions() {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const regions = [...new Set(data.map(country => country.region))];
                setState(prevState => ({ ...prevState, regions: regions }));
            } catch (error) {
                setState(prevState => ({ ...prevState, error: error.message }));
            }
        }

        fetchRegions();
    }, []);

    const handleChange = (e) => {
        setState(prevState => ({ ...prevState, selectedRegion: e.target.value }));
    };

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = countries.slice(indexOfFirstResult, indexOfLastResult);

    const handlePageChange = (pageNumber) => {
        setState(prevState => ({ ...prevState, currentPage: pageNumber }));
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(countries.length / resultsPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => (
        <li key={number} className="page-number">
            <a href="#" onClick={() => handlePageChange(number)}>{number}</a>
        </li>
    ));

    return (
        <div className="filter-container">
            <div className="select-container">
                <label htmlFor="region-select"></label>
                <select id="region-select" value={selectedRegion} placeholder="Select Region:" onChange={handleChange}>
                    <option value="" >Select Region</option>
                    {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="main-results-area">
                    {countries.map((country) => (
                        <Link to={`/countries/${country.name.common}`} key={country.name.common}>
                            <img src={country.flag} alt="flag" />
                            <div className="info">
                                <h2>{country.name.common}</h2>
                                <p>Capital: {country.capital}</p>
                                <p>Population: {country.population.toLocaleString()}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <ul className="pagination">
                {renderPageNumbers}
            </ul>
        </div>
    );
};

export default Filter;