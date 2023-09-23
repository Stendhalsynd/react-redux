import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  todoAdded,
  todoToggled,
  todoDeleted,
  allCompleted,
  completedCleared,
  todos,
} from "./todosSlice";
import {
  statusFilterChanged,
  filterStatus,
  StatusFilters,
} from "../filters/filtersSlice";

export function Todo() {
  const dispatch = useDispatch();
  const todoList = useSelector(todos).todos;
  const currentStatus = useSelector(filterStatus);
  const [textInput, setTextInput] = useState("");

  const resultTodos = (currentStatus) => {
    switch (currentStatus) {
      case StatusFilters.Active:
        return todoList.filter((todo) => todo.completed === false);
      case StatusFilters.Completed:
        return todoList.filter((todo) => todo.completed === true);
      default:
        return todoList;
    }
  };

  const titleStyle = {
    padding: "15px",
    background: "antiquewhite",
    fontWeight: "bold",
    fontSize: "x-large",
  };

  const itemContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 14fr 1fr",
    padding: "10px 0",
  };

  const footerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "0.5px solid black",
  };

  return (
    <>
      <div style={titleStyle}>TODO 앱 만들기</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="할일 추가하기"
          style={{ width: "93vw" }}
        />
        <button
          onClick={() => {
            dispatch(todoAdded(textInput));
            setTextInput("");
          }}
        >
          add
        </button>
      </div>
      <ul>
        {resultTodos(currentStatus).map((todo) => (
          <li key={todo.id} style={itemContainerStyle}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(todoToggled(todo.id))}
              id={todo.id}
            />
            <label htmlFor={todo.id} style={{ padding: "5px" }}>
              {todo.text}
            </label>
            <button onClick={() => dispatch(todoDeleted(todo.id))}>x</button>
          </li>
        ))}
      </ul>

      <div style={footerContainerStyle}>
        <div>
          <button onClick={() => dispatch(allCompleted())}>
            모두 체크하기
          </button>
          <button onClick={() => dispatch(completedCleared())}>
            완료한 일 모두 삭제하기
          </button>
        </div>

        <select
          name="status"
          onChange={(e) => {
            dispatch(statusFilterChanged(e.target.value));
          }}
          value={currentStatus}
        >
          <option value="all">모두 보기</option>
          <option value="active">할 일 보기</option>
          <option value="completed">완료한 일 보기</option>
        </select>
      </div>
    </>
  );
}
