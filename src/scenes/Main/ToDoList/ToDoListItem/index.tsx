import React from "react";
import "./index.scss";
import { Todo, PrimaryKey } from "../../../../store/types";
import { Button, Icon, PopoverPosition } from "@blueprintjs/core";
import { formatISO } from "date-fns";
import { connect } from "react-redux";
import { deleteToDo } from "../../../../store/actions/todo";
// interface ToDoListItemProps extends Todo {}
interface ToDoListItemProps {
  todo: Todo
  deleteToDo: (payload: {id: PrimaryKey, group: PrimaryKey}) => Promise<any>
}

const ToDoListItem = (props: ToDoListItemProps) => {
  const [isHovered, setHovered] = React.useState<boolean>(false);
  const onDeleteClick = () => {
    props.deleteToDo({id: props.todo.id, group: props.todo.group})
  }
  return (
    <div
      className="todo-item"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div className="todo-item__left-wrapper">
        <Icon
          className="todo-item__complete-button"
          icon={isHovered ? "confirm" : "circle"}
        />
        <div className="todo-item__content">{props.todo.content}</div>
      </div>
      <div className="todo-item__right-wrapper">
        <div className="todo-item__edit-button"><Button icon="edit">Edit</Button></div>
        <div className="todo-item__delete-button">
          <Button icon="trash" intent="danger" onClick ={onDeleteClick}>Delete</Button>
        </div>
        <div className="todo-item__remind-date">
          {props.todo.remind_at === null
            ? ""
            : `Remind at: ${formatISO(new Date(props.todo.remind_at), {
                representation: "date",
              })}`}
        </div>
      </div>
    </div>
  );
};

export default connect(null, {deleteToDo})(ToDoListItem);
