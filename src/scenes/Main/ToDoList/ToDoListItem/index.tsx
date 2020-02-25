import React from 'react';
import "./index.scss";
import { Todo } from '../../../../store/types';
// interface ToDoListItemProps extends Todo {}
interface ToDoListItemProps {
  content: string
  remind_at: number
}

const ToDoListItem = (props: ToDoListItemProps) => {
  return <div className="todo-item">
    <div className="todo-item__content">{props.content}</div>
    <div className="todo-item__remind-date">{props.remind_at}</div>
    <div className="todo-item__button"></div>
  </div>


}

export default ToDoListItem;