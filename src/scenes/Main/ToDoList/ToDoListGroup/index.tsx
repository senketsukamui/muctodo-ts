import React from "react";
import "./index.scss";
import { StoreRootState } from "../../../../store/types";
import { connect } from "react-redux";
import ToDoListItem from "./../ToDoListItem/index";
import { InputGroup, Button } from "@blueprintjs/core";
import DatePicker from "react-datepicker";
import { createToDo } from "./../../../../store/actions/todo";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Todo } from "./../../../../store/types";

const ToDoListGroup = (props: any) => {
  const renderedGroupedTodos = props.groupedTodos.todos.map((p: any) => (
    <ToDoListItem todo={p} />
  ));
  const currentGroup = props.groupedTodos.id;
  // const progressBarValue =
  //   Object.values(props.groupedTodos)
  //     .filter((e: Todo) => e.completed)
  //     .length() / props.groupedTodos.length();
  const [isInputOpen, setInputOpen] = React.useState<boolean>(false);
  const onInputButtonClick = () => {
    setInputOpen(!isInputOpen);
  };
  const onAddClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoToFetch = {
      content: inputState,
      remind_at: remindDate,
      group: currentGroup,
      position: 1,
    };
    props.createToDo(todoToFetch);
    setInputOpen(false);
  };
  const [remindDate, setRemindDate] = React.useState<Date>(new Date());
  const [inputState, setInputState] = React.useState<string>("");
  return (
    <div>
      <div className="font-medium">{props.groupedTodos.title}</div>
      <div>
        <CircularProgressbar
          value={props.progressBarValue == NaN ? 0 : props.progressBarValue}
          text={`${
            props.progressBarValue == NaN ? "0%" : props.progressBarValue * 100
          }%`}
          maxValue={1}
        />
      </div>
      <div className="todo-group">{renderedGroupedTodos}</div>
      {isInputOpen ? (
        <form onSubmit={onAddClick}>
          <InputGroup
            className="todo-list__add__input"
            leftIcon="add"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputState(e.target.value)
            }
            placeholder="Add new task"
            type="text"
          ></InputGroup>
          <Button className="right-input-element__button" type="submit">
            Add
          </Button>
          <DatePicker
            className="right-input-element__date-picker form-control"
            selected={remindDate}
            onChange={(date: Date) => setRemindDate(date)}
          />
        </form>
      ) : (
        <Button icon="add" onClick={onInputButtonClick} />
      )}
    </div>
  );
};

export default connect(
  (store: StoreRootState) => ({
    groups: store.todo.groups,
  }),
  { createToDo }
)(ToDoListGroup);
