import { FaSearch } from 'react-icons/fa';
import { useTodoContext } from '../context/TodoContext';

/**
 * Filter component for filtering and searching todos
 */
export const Filter = ({ isDarkMode }) => {
  const { state, setFilter, setSearchQuery } = useTodoContext();

  const filterOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } rounded-lg shadow-md p-4 space-y-4`}
    >
      {/* Search Input */}
      <div className="relative">
        <FaSearch
          className={`absolute left-3 top-3 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}
        />
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 rounded transition-colors ${
            isDarkMode
              ? 'bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-blue-500'
              : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:border-blue-500'
          } focus:outline-none`}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              state.filter === option.value
                ? 'bg-blue-600 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className={`grid grid-cols-3 gap-2 pt-2 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Total
          </p>
          <p className="text-lg font-bold text-blue-600">
            {state.todos.length}
          </p>
        </div>
        <div className="text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Pending
          </p>
          <p className="text-lg font-bold text-orange-600">
            {state.todos.filter((t) => !t.completed).length}
          </p>
        </div>
        <div className="text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Completed
          </p>
          <p className="text-lg font-bold text-green-600">
            {state.todos.filter((t) => t.completed).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Filter;
