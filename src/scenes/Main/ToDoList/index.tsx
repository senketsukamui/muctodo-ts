import React, { FormEvent, RefObject } from "react";
import "./index.scss";
import ToDoListItem from "./ToDoListItem";
import {
  Button,
  InputGroup,
} from "@blueprintjs/core";
import { StoreRootState, Todos } from './../../../store/types';
import { connect } from "react-redux";
import store from "../../../store";
import ToDoListGroup from "./ToDoListGroup";
const MockDataForNotes = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5"];

const ToDoList = (props: any) => {
  const toDoToRender = Object.entries(props.groups).map((p:any) => <ToDoListGroup groupedTodos = {p[1]} />)
  console.log(Object.entries(props.groups))
  return (
    <div className="todo-list">
      <div className="todo-list__title">Your tasks To Do</div>
      <div className="todo-list__list">
        {toDoToRender}
      </div>
    </div>
  );
};

export default connect((store: StoreRootState) => ({groups: store.todo.groups}), null)(ToDoList);
