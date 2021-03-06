import React, { FormEvent, RefObject } from "react";
import "./index.scss";
import ToDoListItem from "./ToDoListItem";
import { Button, InputGroup } from "@blueprintjs/core";
import { StoreRootState, Todo } from "./../../../store/types";
import { connect } from "react-redux";
import store from "../../../store";
import ToDoListGroup from "./ToDoListGroup";
import { createGroup } from "./../../../store/actions/todo";
import Loader from "../../../components/Loader";
import AnimatedPageTransition from "../../../components/AnimatedPageTransition";
import { DragDropContext } from "react-beautiful-dnd";

const ToDoList = (props: any) => {
  const toDoToRender = Object.values(props.groups).map((p: any) => {
    const completedTodos = p.todos.filter((e: Todo) => e.completed);
    const progressBarValue = p.todos.length
      ? parseFloat((completedTodos.length / p.todos.length).toFixed(2))
      : 0;
    return (
      <ToDoListGroup groupedTodos={p} progressBarValue={progressBarValue} />
    );
  });
  const inputRef = React.createRef<InputGroup>();
  const [inputState, setInputState] = React.useState<string>("");
  const onAddClick = () => {
    props.createGroup({ title: inputState });
  };
  const rightElement = (
    <div>
      <Button onClick={onAddClick}>Add</Button>
    </div>
  );
  const onDragEnd = (result: any) => {
    console.log(result);
    return result;
  };
  if (props.todosLoading) {
    return <Loader />;
  } else if (props.todosLoadingFailed) {
    return <div>Something went wrong</div>;
  } else {
    return (
      <div className="todo-list">
        <div className="todo-list__title">Your tasks To Do</div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="todo-list__list">{toDoToRender}</div>
        </DragDropContext>
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
