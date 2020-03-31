import React from "react";
import "./index.scss";
import { Todo } from "../../../../store/types";
import { Button, Icon } from "@blueprintjs/core";
// interface ToDoListItemProps extends Todo {}
interface ToDoListItemProps {
  content: string;
  remind_at: number;
}

const ToDoListItem = (props: ToDoListItemProps) => {
  const [isHovered, setHovered] = React.useState<boolean>(false);
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
        <div className="todo-item__content">{props.content}</div>
      </div>
      <div className="todo-item__right-wrapper">
        <div className="todo-item__edit-button">Edit</div>
        <div className="todo-item__remind-date">
          {isHovered ? `Remind at: ${props.remind_at}` : ""}
        </div>
      </div>
    </div>
  );
};

export default ToDoListItem;
