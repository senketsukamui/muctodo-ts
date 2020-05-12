import React from "react";
import { StoreRootState, TodoState, Todo } from "./../../../store/types";
import { connect } from "react-redux";
import AnimatedPageTransition from "../../../components/AnimatedPageTransition";
import { isToday } from "date-fns";
import _ from "lodash";
import "./index.scss";
import ToDoListItem from "./../ToDoList/ToDoListItem/index";
import Loader from "./../../../components/Loader/index";
interface WelcomeListProps {
  groups: TodoState;
  todosLoading: boolean;
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
  return (
    <div>
      <div className="welcome-list__title font-big">Today tasks</div>
      <div className="welcome-list__todos">
        {todosToRender ? todosToRender : "No tasks for today"}
      </div>
    </div>
  );
};

export default connect(
  (store: StoreRootState) => ({
    groups: store.todo.groups,
    todosLoading: store.todo.todosLoading,
  }),
  null
)(WelcomeList);
