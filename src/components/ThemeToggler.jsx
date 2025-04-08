import React, { useContext } from 'react';
import AppContext from '../AppContext';

function ThemeToggler() {
  const { isDarkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        background: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
      }}
    >
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}

export default ThemeToggler;
