import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: 0, text: "Learn React", completed: true },
    { id: 1, text: "Learn Redux", completed: false },
  ],
};

// Create a utility function to generate the next todo ID
function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: (state, action) => {
      state.todos.push({
        id: nextTodoId(state.todos),
        text: action.payload,
        completed: false,
      });
    },
    todoToggled: (state, action) => {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
    todoDeleted: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    allCompleted: (state) => {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        completed: true,
      }));
    },
    completedCleared: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
});

export const maxId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;

export const todos = (state) => state.todos;

export const completedTodos = (state) =>
  state.todos.filter((todo) => todo.completed === true);

export const {
  todoAdded,
  todoToggled,
  todoDeleted,
  allCompleted,
  completedCleared,
} = todosSlice.actions;

export default todosSlice.reducer;
