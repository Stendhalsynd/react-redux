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
      state.todos = todo_added(state.todos, action.payload);
    },
    todoToggled: (state, action) => {
      state.todos = todo_toggled(state.todos, action.payload);
    },
    todoDeleted: (state, action) => {
      state.todos = todo_deleted(state.todos, action.payload);
    },
    allCompleted: (state) => {
      state.todos = todo_all_completed(state.todos);
    },
    completedCleared: (state) => {
      state.todos = todo_completed_cleared(state.todos);
    },
  },
});

export const maxId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;

export const todos = (state) => state.todos.todos;

export const {
  todoAdded,
  todoToggled,
  todoDeleted,
  allCompleted,
  completedCleared,
} = todosSlice.actions;

export default todosSlice.reducer;

function todo_added(todos, text) {
  const newTodos = todos.slice();
  newTodos.push({
    id: nextTodoId(todos),
    text,
    completed: false,
  });
  return newTodos;
}

function todo_toggled(todos, id) {
  const newTodos = todos.slice();
  const newToggledTodo = newTodos.find((todo) => todo.id === id);
  if (newToggledTodo) newToggledTodo.completed = !newToggledTodo.completed;

  return newTodos;
}

function todo_deleted(todos, id) {
  const newTodos = todos.slice();
  return newTodos.filter((todo) => todo.id !== id);
}

function todo_all_completed(todos) {
  const newTodos = todos.slice();
  return newTodos.map((todo) => ({
    ...todo,
    completed: true,
  }));
}

function todo_completed_cleared(todos) {
  const newTodos = todos.slice();
  return newTodos.filter((todo) => !todo.completed);
}
