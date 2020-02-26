import React, { FormEvent, RefObject } from "react";
import "./index.scss";
import ToDoListItem from "./ToDoListItem";
import {
  Button,
  Icon,
  InputGroup,
  Intent,
  Menu,
  MenuItem,
  Popover,
  Position,
  Spinner,
  Tag,
  Tooltip
} from "@blueprintjs/core";
import { Classes, H5, Switch } from "@blueprintjs/core";
import { DateTimePicker } from "@blueprintjs/datetime";

const MockDataForNotes = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5"];
const ToDoList = () => {
  const toDoToRender = MockDataForNotes.map(p => (
    <ToDoListItem content={p} remind_at={Date.now()} />
  ));
  const inputRef = React.createRef<InputGroup>();
  const onAddClick = () => {
    MockDataForNotes.push(inputState);
    console.log(MockDataForNotes);
  };
  const addTaskButton = (
    <div>
      <Button className="todo-list__add__button" onClick={onAddClick}>
        Add
      </Button>
    </div>
  );
  const [inputState, setInputState] = React.useState<string>("");

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
            rightElement={addTaskButton}
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

export default ToDoList;
