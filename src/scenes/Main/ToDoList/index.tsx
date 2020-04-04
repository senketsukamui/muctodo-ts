import React, { FormEvent, RefObject } from "react";
import "./index.scss";
import ToDoListItem from "./ToDoListItem";
import {
  Button,
  InputGroup,
} from "@blueprintjs/core";
import DatePicker from "react-datepicker";
import { StoreRootState, Todos } from './../../../store/types';
import { connect } from "react-redux";
import store from "../../../store";
import ToDoListGroup from "./ToDoListGroup";
const MockDataForNotes = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5"];

const ToDoList = (props: any) => {
  const toDoToRender = Object.entries(props.groups).map((p:any) => <ToDoListGroup groupedTodos = {p[1].todos} />)
  const inputRef = React.createRef<InputGroup>();
  const [remindDate, setRemindDate] = React.useState<Date>(new Date());
  const onAddClick = () => {
    console.log(MockDataForNotes);
  };
  const [inputState, setInputState] = React.useState<string>("");
  const rightInputElement = (
    <div className = "right-input-element">
       <DatePicker className = "right-input-element__date-picker form-control" selected = {remindDate} onChange = {(date: Date) => setRemindDate(date)}/>
      <Button className="right-input-element__button" onClick={onAddClick}>
        Add
      </Button>
      </div>
  );
  console.log("date", remindDate);
  console.log("input", inputState)
  console.log(Object.entries(props.groups))
  return (
    <div className="todo-list">
      <div className="todo-list__title">Your tasks To Do</div>
      <div className="todo-list__list">
        {toDoToRender}
        <div className="todo-list__add">
          <InputGroup
            ref={inputRef}
            className="todo-list__add__input"
            leftIcon="add"
            rightElement={rightInputElement}
            fill={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputState(e.target.value)
            }
            placeholder="Add new task"
            type="text"
          ></InputGroup>
        </div> 
      </div>
    </div>
  );
};

export default connect((store: StoreRootState) => ({groups: store.todo.groups}), null)(ToDoList);
