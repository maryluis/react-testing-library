import React, { useState, useMemo } from 'react';
import './App.css';
import Main from "./components/Main";
import Header from "./components/Header";
import classNames from 'classnames';


export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');
  const themeContext = useMemo(() => ({
    theme: theme,
    setTheme: () => {
      if (theme === 'light'){
        setTheme('dark');
      } else {
        setTheme('light');
      }
    },
  }), [theme]);

  const appClassName = classNames({
    'App': true, 
    'light-body': theme === 'light', 
    'dark-body': theme === 'dark'})
  return (
    <ThemeContext.Provider value={themeContext}>
      <div className={appClassName}>
        <Header/>
        <Main/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
