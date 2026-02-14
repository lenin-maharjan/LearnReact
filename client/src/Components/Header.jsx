import { Link, useLocation } from 'react-router-dom';
import { FaPlus, FaMoon, FaSun } from 'react-icons/fa';

/**
 * Header component with navigation and theme toggle
 */
export const Header = ({ isDarkMode, onToggleDarkMode }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg`}>
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">✓ TodoPro</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden sm:flex gap-6">
            <Link
              to="/"
              className={`transition-colors ${
                isActive('/')
                  ? 'text-blue-600 font-semibold'
                  : isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/add"
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/add')
                  ? 'bg-blue-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <FaPlus size={16} />
              <span>Add Task</span>
            </Link>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex gap-2 mt-4">
          <Link
            to="/"
            className={`flex-1 py-2 px-3 rounded transition-colors text-center ${
              isActive('/')
                ? 'bg-blue-600 text-white'
                : isDarkMode
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Home
          </Link>
          <Link
            to="/add"
            className={`flex-1 py-2 px-3 rounded transition-colors text-center ${
              isActive('/add')
                ? 'bg-blue-600 text-white'
                : isDarkMode
                ? 'bg-gray-800 text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Add Task
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
