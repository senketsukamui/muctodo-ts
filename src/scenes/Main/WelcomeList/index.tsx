import React from "react";
import { StoreRootState, TodoState } from "./../../../store/types";
import { connect } from "react-redux";
import AnimatedPageTransition from "../../../components/AnimatedPageTransition";
import { isEqual } from "date-fns";
interface WelcomeListProps {
  groups: TodoState;
}
const WelcomeList = (props: WelcomeListProps) => {
  const allToDos = [];
  console.log(Object.values(props.groups));
  const remindToday = Object.values(props.groups).map((e: any) =>
    e.todos.map((todo: any) => allToDos.push(todo))
  );
  console.log(remindToday);
  return <div>Test</div>;
};

export default connect(
  (store: StoreRootState) => ({ groups: store.todo.groups }),
  null
)(WelcomeList);
