import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { useTodoContext } from '../context/TodoContext';

/**
 * TodoItem component for displaying individual todo items
 */
export const TodoItem = ({ todo, isDarkMode }) => {
  const { toggleTodo, deleteTodo } = useTodoContext();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100';
      case 'medium':
        return 'bg-yellow-100';
      case 'low':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-lg p-4 flex items-start gap-4 transition-all hover:shadow-md`}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : isDarkMode
            ? 'border-gray-600 hover:border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
        aria-label={`Mark todo as ${todo.completed ? 'pending' : 'completed'}`}
      >
        {todo.completed && <FaCheck size={14} className="text-white" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`text-lg font-semibold transition-all ${
            todo.completed
              ? isDarkMode
                ? 'text-gray-500 line-through'
                : 'text-gray-400 line-through'
              : isDarkMode
              ? 'text-white'
              : 'text-gray-900'
          }`}
        >
          {todo.title}
        </h3>

        {todo.description && (
          <p
            className={`mt-1 text-sm ${
              todo.completed
                ? isDarkMode
                  ? 'text-gray-600'
                  : 'text-gray-400'
                : isDarkMode
                ? 'text-gray-400'
                : 'text-gray-600'
            }`}
          >
            {todo.description}
          </p>
        )}

        {/* Meta information */}
        <div className="mt-3 flex items-center gap-3 text-xs">
          <span
            className={`px-2 py-1 rounded ${getPriorityBgColor(
              todo.priority
            )} ${getPriorityColor(todo.priority)} font-medium uppercase`}
          >
            {todo.priority}
          </span>
          {todo.createdAt && (
            <span
              className={`${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}
            >
              Created {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Link
          to={`/edit/${todo.id}`}
          className={`p-2 rounded transition-colors ${
            isDarkMode
              ? 'bg-gray-700 text-blue-400 hover:bg-gray-600'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
          aria-label="Edit todo"
        >
          <FaEdit size={16} />
        </Link>
        <button
          onClick={() => deleteTodo(todo.id)}
          className={`p-2 rounded transition-colors ${
            isDarkMode
              ? 'bg-gray-700 text-red-400 hover:bg-gray-600'
              : 'bg-red-50 text-red-600 hover:bg-red-100'
          }`}
          aria-label="Delete todo"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
