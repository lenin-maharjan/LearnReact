/**
 * LocalStorage utility functions for persisting todos
 */

const TODOS_KEY = 'todos';
const DARK_MODE_KEY = 'darkMode';

/**
 * Get all todos from localStorage
 * @returns {Array} Array of todo objects
 */
export const getTodos = () => {
  try {
    const todos = localStorage.getItem(TODOS_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Error reading todos from localStorage:', error);
    return [];
  }
};

/**
 * Save todos to localStorage
 * @param {Array} todos - Array of todo objects to save
 */
export const saveTodos = (todos) => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
  }
};

/**
 * Clear all todos from localStorage
 */
export const clearTodos = () => {
  try {
    localStorage.removeItem(TODOS_KEY);
  } catch (error) {
    console.error('Error clearing todos from localStorage:', error);
  }
};

/**
 * Get dark mode preference from localStorage
 * @returns {boolean} Dark mode enabled/disabled
 */
export const getDarkMode = () => {
  try {
    const darkMode = localStorage.getItem(DARK_MODE_KEY);
    return darkMode ? JSON.parse(darkMode) : false;
  } catch (error) {
    console.error('Error reading dark mode preference:', error);
    return false;
  }
};

/**
 * Save dark mode preference to localStorage
 * @param {boolean} isDarkMode - Dark mode enabled/disabled
 */
export const saveDarkMode = (isDarkMode) => {
  try {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDarkMode));
  } catch (error) {
    console.error('Error saving dark mode preference:', error);
  }
};

/**
 * Export todos as JSON file
 * @param {Array} todos - Array of todos to export
 */
export const exportTodosAsJSON = (todos) => {
  const dataStr = JSON.stringify(todos, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `todos_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Import todos from JSON file
 * @param {File} file - JSON file to import
 * @returns {Promise<Array>} Promise resolving to imported todos
 */
export const importTodosFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const todos = JSON.parse(e.target.result);
        if (Array.isArray(todos)) {
          resolve(todos);
        } else {
          reject(new Error('Invalid JSON format: expected an array'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};
