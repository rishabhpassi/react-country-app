import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// get our fontawesome imports
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import "../styles/headerStyle.css";
import React from 'react';


function Header() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  return(
    <div className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1 className="title">
        Where in the World?
      </h1>
      <div className="dark" onClick={handleClick}>
        <FontAwesomeIcon className='Dark-Mode' icon={faMoon} />
        <p className="dark-text">Dark Mode</p>
      </div>
    </div>
  );
}
export default Header;
