import React from "react";
import "./index.scss";
import ToDoListItem from "./ToDoListItem";
const MockDataForNotes = ['Note 1', 'Note 2', 'Note 3', 'Note 4', 'Note 5', 'Note 6', 'Note 7', 'Note 8', 'Note 9', 'Note 10', 'Note 11', 'Note 12']
const ToDoList = () => {
  const toDoToRender = MockDataForNotes.map(p => <ToDoListItem content = {p} remind_at ={Date.now()} />)
  return (
    <div className="todo-list">
      <div className="todo-list__title">Your tasks To Do</div>
      <div className="todo-list__list">{toDoToRender}</div>
    </div>
  );
};

export default ToDoList;
