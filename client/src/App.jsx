import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import { TodoProvider } from './context/TodoContext';
import { getDarkMode, saveDarkMode } from './utils/storage';
import './styles/App.css';

/**
 * Main App component with routing and dark mode
 */
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => getDarkMode());

  // Save dark mode preference to localStorage
  useEffect(() => {
    saveDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <TodoProvider>
      <Router>
        <div className={isDarkMode ? 'dark' : ''}>
          <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/add" element={<AddTodo isDarkMode={isDarkMode} />} />
            <Route
              path="/edit/:id"
              element={<EditTodo isDarkMode={isDarkMode} />}
            />
          </Routes>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;