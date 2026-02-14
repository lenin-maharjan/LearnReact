import React, { createContext, useReducer, useCallback, useEffect } from 'react';
import { getTodos, saveTodos } from '../utils/storage';

// Create the context
export const TodoContext = createContext();

// Action types
export const TODO_ACTIONS = {
  LOAD_TODOS: 'LOAD_TODOS',
  ADD_TODO: 'ADD_TODO',
  DELETE_TODO: 'DELETE_TODO',
  UPDATE_TODO: 'UPDATE_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  RESET_TODOS: 'RESET_TODOS',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
};

// Initial state
const initialState = {
  todos: [],
  filter: 'all', // all, completed, pending
  searchQuery: '',
};

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.LOAD_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case TODO_ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case TODO_ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TODO_ACTIONS.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload.updates } : todo
        ),
      };

    case TODO_ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case TODO_ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    case TODO_ACTIONS.RESET_TODOS:
      return initialState;

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case TODO_ACTIONS.SET_SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};

// Provider component
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = getTodos();
    dispatch({ type: TODO_ACTIONS.LOAD_TODOS, payload: savedTodos });
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveTodos(state.todos);
  }, [state.todos]);

  // Action creators
  const addTodo = useCallback((todo) => {
    const newTodo = {
      id: Date.now(),
      title: todo.title,
      description: todo.description || '',
      completed: false,
      priority: todo.priority || 'medium',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: newTodo });
    return newTodo;
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: id });
  }, []);

  const updateTodo = useCallback((id, updates) => {
    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO,
      payload: { id, updates },
    });
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: TODO_ACTIONS.TOGGLE_TODO, payload: id });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: TODO_ACTIONS.CLEAR_COMPLETED });
  }, []);

  const resetTodos = useCallback(() => {
    dispatch({ type: TODO_ACTIONS.RESET_TODOS });
  }, []);

  const getTodoById = useCallback(
    (id) => {
      return state.todos.find((todo) => todo.id === parseInt(id));
    },
    [state.todos]
  );

  // Filtered todos based on filter and search
  const getFilteredTodos = useCallback(() => {
    let filtered = state.todos;

    // Filter by status
    if (state.filter === 'completed') {
      filtered = filtered.filter((todo) => todo.completed);
    } else if (state.filter === 'pending') {
      filtered = filtered.filter((todo) => !todo.completed);
    }

    // Search by title or description
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [state.todos, state.filter, state.searchQuery]);

  const value = {
    state,
    dispatch,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo,
    clearCompleted,
    resetTodos,
    getTodoById,
    getFilteredTodos,
    setFilter: (filter) => dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: filter }),
    setSearchQuery: (query) => dispatch({ type: TODO_ACTIONS.SET_SEARCH, payload: query }),
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook for using the context
export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
