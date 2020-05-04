import React from "react";
import { StoreRootState, TodoState } from "./../../../store/types";
import { connect } from "react-redux";
import AnimatedPageTransition from "../../../components/AnimatedPageTransition";
interface WelcomeListProps {
  groups: TodoState;
}
const WelcomeList = (props: WelcomeListProps) => {
  const remindToday = Object.values(props.groups);
  return (
    <AnimatedPageTransition>
      <div>Test</div>
    </AnimatedPageTransition>
  );
};

export default connect(
  (store: StoreRootState) => ({ groups: store.todo.groups }),
  null
)(WelcomeList);
