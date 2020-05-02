import React from "react";
import Sidebar from "./Sidebar/index";
import "./index.scss";
import ToDoList from "./ToDoList";
import { connect } from "react-redux";
import { getToDos } from "../../store/actions/todo";
import { createToDo, editToDo } from "./../../store/actions/todo";
import { TodoFetch, PrimaryKey, StoreRootState } from "./../../store/types";
import { useHistory } from "react-router-dom";
import { getLocalStorageToken } from "../../utils";
interface MainSceneProps {
  getToDos: () => Promise<any>;
  createToDo: (payload: { todo: TodoFetch }) => Promise<any>;
  token: string | null;
}

const MainScene = (props: MainSceneProps) => {
  const history = useHistory();
  if (!getLocalStorageToken()) {
    history.push("/auth");
  }
  React.useEffect(() => {
    props.getToDos();
  }, []);
  return (
    <div className="main-scene">
      <Sidebar />
      <div className="main-content">
        <div className="main-content__list">
          <ToDoList />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (store: StoreRootState) => ({ token: store.user.token }),
  { getToDos, createToDo, editToDo }
)(MainScene);
