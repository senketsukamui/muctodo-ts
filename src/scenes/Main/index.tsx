import React from "react";
import Sidebar from "./Sidebar/index";
import "./index.scss";
import ToDoList from "./ToDoList";

const MainScene = () => {
  return (
    <div className="main-scene">
      <Sidebar />
      <div className="main-content">
        <div className="main-content__list"><ToDoList /></div>
      </div>
    </div>
  );
};

export default MainScene;
