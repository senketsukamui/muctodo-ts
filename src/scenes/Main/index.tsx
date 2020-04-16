import React from "react";
import Sidebar from "./Sidebar/index";
import "./index.scss";
import ToDoList from "./ToDoList";
import { connect } from "react-redux";
import { getToDos } from "../../store/actions/todo";
import { createToDo, editToDo } from "./../../store/actions/todo";
import { Todo, TodoFetch, PrimaryKey } from "./../../store/types";
interface MainSceneProps {
  getToDos: () => Promise<any>;
  createToDo: (payload: { todo: TodoFetch }) => Promise<any>;
  editToDo: (payload: TodoFetch & { id: PrimaryKey }) => Promise<any>;
}

const MainScene = (props: MainSceneProps) => {
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

export default connect(null, { getToDos, createToDo, editToDo })(MainScene);
