import TodoItem from './TodoItem';

/**
 * TodoList component for displaying a list of todos
 */
export const TodoList = ({ todos, isDarkMode }) => {
  if (todos.length === 0) {
    return (
      <div
        className={`text-center py-12 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        } rounded-lg`}
      >
        <p
          className={`text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          No tasks found. Create your first task to get started! 🎯
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
};

export default TodoList;