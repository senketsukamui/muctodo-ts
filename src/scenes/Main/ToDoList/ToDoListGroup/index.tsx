import React from 'react';
import "./index.scss"
import { StoreRootState } from '../../../../store/types';
import { connect } from 'react-redux';
import ToDoListItem from './../ToDoListItem/index';


const ToDoListGroup = (props:any) => {
  const renderedGroupedTodos = props.groupedTodos.map((p:any) => <ToDoListItem content = {p.content} remind_at = {p.remind_at} />)
  return <div className = "todo-group">{renderedGroupedTodos}</div>
}

export default connect((store: StoreRootState) => ({groups: store.todo.groups}))(ToDoListGroup)