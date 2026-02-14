import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Filter from '../components/Filter';
import TodoList from '../components/TodoList';
import { useTodoContext } from '../context/TodoContext';
import { exportTodosAsJSON, importTodosFromJSON } from '../utils/storage';

/**
 * Home page - displays todo list with filtering options
 */
export const Home = ({ isDarkMode }) => {
  const {
    state,
    getFilteredTodos,
    clearCompleted,
    resetTodos,
    addTodo,
  } = useTodoContext();

  const [showClearModal, setShowClearModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const filteredTodos = getFilteredTodos();
  const completedCount = state.todos.filter((t) => t.completed).length;

  const handleExport = () => {
    exportTodosAsJSON(state.todos);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedTodos = await importTodosFromJSON(file);
      // Import each todo
      importedTodos.forEach((todo) => {
        addTodo({
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
        });
      });
      alert('Todos imported successfully!');
    } catch (error) {
      alert(`Error importing todos: ${error.message}`);
    }

    // Reset file input
    e.target.value = '';
  };

  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      } min-h-screen pt-8`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Tasks</h1>
          <p
            className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Stay organized and productive with your personalized task list
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Filter Component */}
              <Filter isDarkMode={isDarkMode} />

              {/* Actions */}
              <div
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg shadow-md p-4 space-y-3`}
              >
                <p className="font-semibold text-sm">Actions</p>

                {/* Export Button */}
                <button
                  onClick={handleExport}
                  className={`w-full py-2 px-3 rounded transition-colors text-sm font-medium ${
                    isDarkMode
                      ? 'bg-green-700 text-green-100 hover:bg-green-600'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                  disabled={state.todos.length === 0}
                >
                  📥 Export Tasks
                </button>

                {/* Import Button */}
                <label className="w-full block">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                  <span
                    className={`w-full py-2 px-3 rounded transition-colors text-sm font-medium text-center block cursor-pointer ${
                      isDarkMode
                        ? 'bg-blue-700 text-blue-100 hover:bg-blue-600'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    📤 Import Tasks
                  </span>
                </label>

                {/* Clear Completed */}
                <button
                  onClick={() => setShowClearModal(true)}
                  className={`w-full py-2 px-3 rounded transition-colors text-sm font-medium ${
                    isDarkMode
                      ? 'bg-yellow-700 text-yellow-100 hover:bg-yellow-600'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                  disabled={completedCount === 0}
                >
                  🧹 Clear Completed
                </button>

                {/* Reset All */}
                <button
                  onClick={() => setShowResetModal(true)}
                  className={`w-full py-2 px-3 rounded transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
                    isDarkMode
                      ? 'bg-red-700 text-red-100 hover:bg-red-600'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                  disabled={state.todos.length === 0}
                >
                  <FaTrash size={14} />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Display filtered todos */}
            <TodoList todos={filteredTodos} isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>

      {/* Clear Completed Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg p-6 max-w-sm mx-4`}
          >
            <h2 className="text-xl font-bold mb-4">Clear Completed Tasks?</h2>
            <p
              className={`mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              This action will remove all completed tasks. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearModal(false)}
                className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearCompleted();
                  setShowClearModal(false);
                }}
                className="flex-1 py-2 px-4 rounded font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset All Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg p-6 max-w-sm mx-4`}
          >
            <h2 className="text-xl font-bold mb-4">Reset All Tasks?</h2>
            <p
              className={`mb-6 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              This will delete all tasks. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetTodos();
                  setShowResetModal(false);
                }}
                className="flex-1 py-2 px-4 rounded font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
