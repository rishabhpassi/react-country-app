import React, { useState, useEffect } from 'react';
import "../styles/searchStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// get our fontawesome imports
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Search() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        if (searchTerm) {
            fetchData();
        } else {
            setCountries([]);
        }
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className='search-area'>
            <div className='form-field'>

                <input type="search" placeholder='Search the Country' id="site-search" name="q" onChange={handleSearch} />
                <span class="icon"><FontAwesomeIcon className='Dark-Mode' icon={faSearch} /></span>
            </div>
            {loading && <div>Loading...</div>}
            {error ? <div>{error}</div> : countries.length > 0 ? countries.slice(0, 12).map((country) => (
                <div className='search-results' key={country.name.common}>{country.name.common}{country.flag}</div>
            )) : null}
        </div>
    );
}

export default Search;
