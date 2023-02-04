import React from "react";
import Header from "./components/header";
import Search from "./components/search";
import Filter from "./components/filter";
import"./App.css";
import CountryInfo from './components/countries';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Search />
      <Routes>
        <Route exact path="/" component={Filter} />
        <Route path="/countries/:name" component={CountryInfo} />
      </Routes>  
    </Router>
  );
}

export default App;
