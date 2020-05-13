import React from "react";
import "./index.scss";
import { StoreRootState } from "../../../../store/types";
import { connect } from "react-redux";
import ToDoListItem from "./../ToDoListItem/index";
import { InputGroup, Button } from "@blueprintjs/core";
import { createToDo } from "./../../../../store/actions/todo";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ceil } from "lodash";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Droppable, Draggable } from "react-beautiful-dnd";

const ToDoListGroup = (props: any) => {
  const renderedGroupedTodos = props.groupedTodos.todos.map(
    (p: any, index: any) => (
      <Draggable
        draggableId={p.id.toString()}
        index={Math.abs(100 - index)}
        key={p}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ToDoListItem todo={p} />
          </div>
        )}
      </Draggable>
    )
  );
  const currentGroup = props.groupedTodos.id;
  const [isInputOpen, setInputOpen] = React.useState<boolean>(false);
  const [remindDate, setRemindDate] = React.useState<Date | null>(new Date());
  const [inputState, setInputState] = React.useState<string>("");
  const onInputButtonClick = () => {
    setInputOpen(!isInputOpen);
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoToFetch = {
      content: inputState,
      remind_at: remindDate,
      group: currentGroup,
      position: 1,
    };
    props.createToDo(todoToFetch);
    setInputOpen(false);
    setRemindDate(new Date());
  };
  const buttonTypeHandler = (type: string) => (e: any) => {
    if (remindDate == null || !inputState) {
      return;
    }
    if (type === "tomorrow") {
      setRemindDate(addDays(remindDate, 1));
    } else if (type === "week") {
      setRemindDate(addDays(remindDate, 7));
    } else if (type === "no-remind") {
      setRemindDate(null);
    }
  };

  return (
    <div>
      <div className="flex flex__space-between">
        <div className="font-medium">{props.groupedTodos.title}</div>
        <div style={{ width: 60, height: 60 }}>
          <CircularProgressbar
            value={props.progressBarValue}
            text={`${ceil(props.progressBarValue * 100)}%`}
            maxValue={1}
          />
        </div>
      </div>
      <div className="todo-group">
        <Droppable droppableId="group">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {renderedGroupedTodos}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      {isInputOpen ? (
        <form onSubmit={onFormSubmit}>
          <InputGroup
            className="todo-list__add__input"
            leftIcon="add"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputState(e.target.value)
            }
            placeholder="Add new task"
            type="text"
            required
          ></InputGroup>
          <div className="flex flex__space-between">
            <Button
              type="submit"
              name="tomorrow"
              onClick={buttonTypeHandler("tomorrow")}
            >
              Remind tomorrow
            </Button>
            <Button
              type="submit"
              name="week"
              onClick={buttonTypeHandler("week")}
            >
              Remind in a week
            </Button>
            <Button
              type="submit"
              name="no-remind"
              onClick={buttonTypeHandler("no-remind")}
            >
              Create with no remind
            </Button>
            <span>
              <DatePicker
                onChange={(date: any) => setRemindDate(date)}
                showTimeSelect
                selected={remindDate}
              />
              <Button type="submit" onClick={buttonTypeHandler("current-date")}>
                Create by current date
              </Button>
            </span>
          </div>
        </form>
      ) : props.todoCreating ? (
        <Button icon="add" loading disabled onClick={onInputButtonClick} />
      ) : (
        <Button icon="add" onClick={onInputButtonClick} />
      )}
    </div>
  );
};

export default connect(
  (store: StoreRootState) => ({
    groups: store.todo.groups,
    todoCreating: store.todo.todoCreating,
  }),
  { createToDo }
)(ToDoListGroup);
