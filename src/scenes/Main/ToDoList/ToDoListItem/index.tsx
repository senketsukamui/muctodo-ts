import React from "react";
import "./index.scss";
import { Todo, PrimaryKey, TodoFetch } from "../../../../store/types";
import { Button, Icon, PopoverPosition, TextArea } from "@blueprintjs/core";
import { format } from "date-fns";
import { connect } from "react-redux";
import { deleteToDo } from "../../../../store/actions/todo";
import { editToDo } from "./../../../../store/actions/todo";
interface ToDoListItemProps {
  todo: Todo;
  deleteToDo: (payload: { id: PrimaryKey; group: PrimaryKey }) => Promise<any>;
  editToDo: (
    payload: TodoFetch & { id: PrimaryKey; completed?: boolean }
  ) => Promise<any>;
}

const ToDoListItem = (props: ToDoListItemProps) => {
  const [isHovered, setHovered] = React.useState<boolean>(false);
  const [isEditable, setEditable] = React.useState<boolean>(false);
  const [todoInput, setTodoInput] = React.useState<string>(props.todo.content);
  const onDeleteClick = () => {
    props.deleteToDo({ id: props.todo.id, group: props.todo.group });
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setEditable(!isEditable);
      props.editToDo({
        id: props.todo.id,
        content: todoInput,
        remind_at: props.todo.remind_at,
        group: props.todo.group,
        position: props.todo.position,
      });
    }
  };
  const onEditClick = (e: any) => {
    if (isEditable === true) {
      props.editToDo({
        id: props.todo.id,
        content: todoInput,
        remind_at: props.todo.remind_at,
        group: props.todo.group,
        position: props.todo.position,
      });
    }
    setEditable(!isEditable);
  };

  const onCompleteClick = (e: any) => {
    props.editToDo({
      id: props.todo.id,
      content: todoInput,
      remind_at: props.todo.remind_at,
      group: props.todo.group,
      position: props.todo.position,
      completed: !props.todo.completed,
    });
  };
  return (
    <div
      className="todo-item"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div className="todo-item__left-wrapper">
        <Icon
          className="todo-item__complete-button"
          icon={props.todo.completed ? "confirm" : "circle"}
          onClick={onCompleteClick}
        />
        {!isEditable ? (
          <div>
            <div className="todo-item__content">{props.todo.content}</div>
            <span>
              {props.todo.remind_at === null
                ? ""
                : `${format(new Date(props.todo.remind_at), "do MMM")}`}
            </span>
          </div>
        ) : (
          <textarea
            className="todo-item__content-edit"
            onKeyPress={(e: any) => onKeyPress(e)}
            onChange={(e: any) => setTodoInput(e.target.value)}
            autoFocus
          >
            {todoInput}
          </textarea>
        )}
      </div>
      <div className="todo-item__right-wrapper">
        {!props.todo.completed && (
          <div className="todo-item__edit-button">
            <Button icon="edit" onClick={onEditClick}>
              Edit
            </Button>
          </div>
        )}
        <div className="todo-item__delete-button">
          <Button icon="trash" intent="danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { deleteToDo, editToDo })(ToDoListItem);
