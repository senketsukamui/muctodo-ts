import React from "react";
import { StoreRootState, TodoState } from "./../../../store/types";
import { connect } from "react-redux";
interface WelcomeListProps {
  groups: TodoState
}
const WelcomeList = (props: WelcomeListProps) => {
  const remindToday = Object.values(props.groups)
  return <div>Test</div>;
};

export default connect(
  (store: StoreRootState) => ({ groups: store.todo.groups }),
  null
)(WelcomeList);
