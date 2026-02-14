import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useTodoContext } from '../context/TodoContext';

/**
 * EditTodo page - form to edit an existing todo
 */
export const EditTodo = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTodoById, updateTodo } = useTodoContext();

  const todo = getTodoById(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load todo data on mount
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        priority: todo.priority || 'medium',
      });
      setIsLoading(false);
    } else {
      // Todo not found, redirect to home
      navigate('/');
    }
  }, [todo, navigate]);

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Update the todo
    updateTodo(todo.id, formData);

    // Navigate back to home
    navigate('/');
  };

  if (isLoading) {
    return (
      <div
        className={`${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        } min-h-screen flex items-center justify-center`}
      >
        <div className="text-center">
          <p
            className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      } min-h-screen pt-8`}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded transition-colors ${
            isDarkMode
              ? 'bg-gray-800 text-blue-400 hover:bg-gray-700'
              : 'bg-gray-200 text-blue-600 hover:bg-gray-300'
          }`}
        >
          <FaArrowLeft size={16} />
          <span>Back to Tasks</span>
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Edit Task</h1>
          <p
            className={`text-lg ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Update your task details
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-lg p-8`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold mb-2"
              >
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Complete project report"
                maxLength={100}
                className={`w-full px-4 py-3 rounded border-2 transition-colors focus:outline-none ${
                  errors.title
                    ? `border-red-500 ${
                        isDarkMode ? 'bg-gray-700' : 'bg-red-50'
                      }`
                    : isDarkMode
                    ? 'border-gray-700 bg-gray-700 focus:border-blue-500'
                    : 'border-gray-300 bg-gray-50 focus:border-blue-500'
                }`}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-500">{errors.title}</p>
              )}
              <p
                className={`mt-2 text-sm ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                {formData.title.length}/100
              </p>
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold mb-2"
              >
                Description <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add more details about your task..."
                rows="4"
                maxLength={500}
                className={`w-full px-4 py-3 rounded border-2 resize-none transition-colors focus:outline-none ${
                  isDarkMode
                    ? 'border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
              />
              <p
                className={`mt-2 text-sm ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                {formData.description.length}/500
              </p>
            </div>

            {/* Priority Field */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-semibold mb-2"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded border-2 transition-colors focus:outline-none ${
                  isDarkMode
                    ? 'border-gray-700 bg-gray-700 text-white focus:border-blue-500'
                    : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500'
                }`}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            {/* Priority Info */}
            <div
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 text-blue-300'
                  : 'bg-blue-50 text-blue-800'
              }`}
            >
              <p className="text-sm font-medium">
                {formData.priority === 'high'
                  ? '🔴 High priority tasks appear at the top'
                  : formData.priority === 'medium'
                  ? '🟡 Medium priority tasks appear in the middle'
                  : '🟢 Low priority tasks appear at the bottom'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                ✓ Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
