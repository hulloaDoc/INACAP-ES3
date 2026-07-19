import React, { useState, useEffect } from 'react';
import { getSession, getPreferences, savePreferences } from './utils/storage';
import Login from './components/Login';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import ErrorAlert from './components/ErrorAlert';
import './App.css';

function App() {

  const [session, setSession] = useState(() => getSession());


  const [theme, setTheme] = useState(() => {
    const prefs = getPreferences();
    return prefs.theme || 'light';
  });


  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);


  const handleLoginSuccess = () => {
    setSession(getSession());
  };


  const handleLogout = () => {
    setSession(null);
  };


  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);


    const prefs = getPreferences();
    savePreferences({
      ...prefs,
      theme: newTheme
    });
  };

  return (
    <div className="app-container">

      <ErrorAlert />

      {session ? (

        <>
          <Header
            user={session.user}
            onLogout={handleLogout}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
          <main className="app-main">
            <TaskBoard theme={theme} />
          </main>
        </>
      ) : (

        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
