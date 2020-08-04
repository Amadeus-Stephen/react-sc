import React, { Component } from "react";
import SubTask from "./subTask";
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.removeTask = this.removeTask.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
    this.removeSubTask = this.removeSubTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.updateSubTask = this.updateSubTask.bind(this);
  }
  removeTask() {
    let tasks = this.props.tasks.splice(this.props.index, 1);
    this.props.updateTasks({ tasks });
  }
  addSubTask() {
    let task = this.props.task;
    let tasks = this.props.tasks;
    task.subtasks.push({ name: "", completed: false });
    tasks[this.props.index] = task;
    this.props.updateTasks({ tasks });
  }
  removeSubTask(index) {
    let task = this.props.task;
    let tasks = this.props.tasks;
    task.subtasks.splice(index, 1);
    tasks[this.props.index] = task;
    this.props.updateTasks({ tasks });
  }

  updateTask(event) {
    let task = this.props.task;
    let tasks = this.props.tasks;
    task.name = event.target.value;
    tasks[this.props.index] = task;
    this.props.updateTasks({ tasks });
  }
  updateSubTask(name, index) {
    let task = this.props.task;
    let tasks = this.props.tasks;
    task.subtasks[index].name = name;
    tasks[this.props.index] = task;
    this.props.updateTasks({ tasks });
  }
  renderChildren() {
    return this.props.task.subtasks.map((i, index) => {
      return (
        <SubTask
          removeSubTask={this.removeSubTask}
          updateSubTask={this.updateSubTask}
          key={index}
          index={index}
          name={i.name}
        />
      );
    });
  }
  render() {
    return (
      <div className="card card-body">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button
              onClick={this.removeTask}
              className="btn btn-danger"
              type="button"
              id="button-addon1"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-dash-square-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm2 7.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1H4z"
                />
              </svg>
            </button>
          </div>
          <div className="input-group-prepend">
            <button
              onClick={this.addSubTask}
              className="btn btn-success"
              type="button"
              id="button-addon1"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="ml-1 bi bi-plus-square-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"
                />
              </svg>
            </button>
          </div>
          <input
            onChange={this.updateTask}
            id="name"
            value={this.props.task.name}
            className="form-control"
            placeholder="Enter Task"
            type="text"
          />
        </div>
        {(this, this.renderChildren())}
      </div>
    );
  }
}

export default AddTask;
