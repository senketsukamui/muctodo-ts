import React from "react";
import "./index.scss";
import { StoreRootState } from "../../../../store/types";
import { connect } from "react-redux";
import ToDoListItem from "./../ToDoListItem/index";
import { InputGroup, Button } from "@blueprintjs/core";
import DatePicker from "react-datepicker";
import { createToDo } from './../../../../store/actions/todo';

const ToDoListGroup = (props: any) => {
  const renderedGroupedTodos = props.groupedTodos.todos.map((p: any) => (
    <ToDoListItem content={p.content} remind_at={p.remind_at} />
  ));
  const currentGroup = props.groupedTodos.id;
  const onAddClick = () => {
    const todoToFetch = {
      content: inputState,
      remind_at: remindDate,
      group: currentGroup,
      position: 1
    }
    props.createToDo(todoToFetch);
  }
  const inputRef = React.createRef<InputGroup>();
  const [remindDate, setRemindDate] = React.useState<Date>(new Date());
  const [inputState, setInputState] = React.useState<string>("");
  const rightInputElement = (
    <div className = "right-input-element">
       <DatePicker className = "right-input-element__date-picker form-control" selected = {remindDate} onChange = {(date: Date) => setRemindDate(date)}/>
      <Button className="right-input-element__button" onClick = {onAddClick}>
        Add
      </Button>
      </div>
  );
  return (
    <div>
      <div className="todo-group__title">{props.groupedTodos.title}</div>
      <div className="todo-group">{renderedGroupedTodos}</div>
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
  );
};

export default connect((store: StoreRootState) => ({
  groups: store.todo.groups,
}), {createToDo})(ToDoListGroup);
