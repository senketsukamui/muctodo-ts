import React, { FormEvent, RefObject } from "react";
import "./index.scss";
import ToDoListItem from "./ToDoListItem";
import { Button, InputGroup } from "@blueprintjs/core";
import { StoreRootState, Todos } from "./../../../store/types";
import { connect } from "react-redux";
import store from "../../../store";
import ToDoListGroup from "./ToDoListGroup";
import { createGroup } from "./../../../store/actions/todo";
import Loader from "../../../components/Loader";
import AnimatedPageTransition from "../../../components/AnimatedPageTransition";

const ToDoList = (props: any) => {
  const toDoToRender = Object.entries(props.groups).map((p: any) => (
    <ToDoListGroup groupedTodos={p[1]} />
  ));
  const inputRef = React.createRef<InputGroup>();
  const [inputState, setInputState] = React.useState<string>("");
  const onAddClick = () => {
    console.log(inputState);
    props.createGroup({ title: inputState });
  };
  const rightElement = (
    <div>
      <Button onClick={onAddClick}>Add</Button>
    </div>
  );
  if (props.todosLoading) {
    return <Loader />;
  } else if (props.todosLoadingFailed) {
    return <div>Something went wrong</div>;
  } else {
    return (
      <AnimatedPageTransition>
      <div className="todo-list">
        <div className="todo-list__title">Your tasks To Do</div>
        <div className="todo-list__list">{toDoToRender}</div>
        <InputGroup
          ref={inputRef}
          leftIcon="add"
          rightElement={rightElement}
          fill={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputState(e.target.value)
          }
          placeholder="Add new group"
          type="text"
        ></InputGroup>
      </div>
      </AnimatedPageTransition>
    );
  }
};

export default connect(
  (store: StoreRootState) => ({
    groups: store.todo.groups,
    todosLoading: store.todo.todosLoading,
    todosLoadingFailed: store.todo.todosLoadingFailed,
  }),
  { createGroup }
)(ToDoList);
