import React from "react";
import { StoreRootState, TodoState, Todo } from "./../../../store/types";
import { connect } from "react-redux";
import AnimatedPageTransition from "../../../components/AnimatedPageTransition";
import { isToday } from "date-fns";
import _ from "lodash";
import ToDoListItem from "./../ToDoList/ToDoListItem/index";
interface WelcomeListProps {
  groups: TodoState;
}
const WelcomeList = (props: WelcomeListProps) => {
  const allToDos = React.useMemo(
    () => _.flatten(Object.values(_.mapValues(props.groups, "todos"))),
    [props.groups]
  );
  const remindToday = allToDos.filter((e: Todo) =>
    e.remind_at ? isToday(new Date(e.remind_at)) : false
  );
  const todosToRender = remindToday.map((todo: Todo) => (
    <ToDoListItem todo={todo} />
  ));
  return <div>{todosToRender && "There are no todos to remind today."}</div>;
};

export default connect(
  (store: StoreRootState) => ({ groups: store.todo.groups }),
  null
)(WelcomeList);
