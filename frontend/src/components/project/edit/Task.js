import React, { Component } from "react";
import SubTask from "./subTask";
class Task extends Component {
  constructor(props) {
    super(props);
    this.removeTask = this.removeTask.bind(this);
    this.updateTaskName = this.updateTaskName.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
    this.removeSubTask = this.removeSubTask.bind(this);
    this.updateSubTaskStatus = this.updateSubTaskStatus.bind(this);
    this.updateSubTaskName = this.updateSubTaskName.bind(this);
  }
  removeTask() {
    let tasks = this.props.tasks.splice(this.props.index, 1);
    this.props.updateTasks({ tasks });
  }
  updateTaskName(event) {
    let task = this.props.task;
    let tasks = this.props.tasks;
    task.name = event.target.value;
    tasks[this.props.index] = task;
    this.props.updateTasks({ tasks });
  }
  addSubTask() {
    let task = this.props.task;
    task.subtasks.push({ name: "", completed: false });
    let tasks = this.props.tasks;
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
  updateSubTaskStatus(index) {
    let task = this.props.task;
    let tasks = this.props.tasks;
    task.subtasks[index].completed = !task.subtasks[index].completed;
    console.log(this.props.task.subtasks[index]);
    tasks[this.props.index] = task;
    this.props.updateTasks({ tasks });
  }
  updateSubTaskName(name, index) {
    let task = this.props.task;
    let tasks = this.props.tasks;
    task.subtasks[index].name = name;
    tasks[this.props.index] = task;
    this.props.updateTasks({ tasks });
  }
  renderSubTasks() {
    return this.props.task.subtasks.map((i, index) => {
      return (
        <SubTask
          key={index}
          name={i.name}
          index={index}
          completed={i.completed}
          removeSubTask={this.removeSubTask}
          updateSubTaskStatus={this.updateSubTaskStatus}
          updateSubTaskName={this.updateSubTaskName}
        />
      );
    });
  }
  render() {
    return (
      <div className="card card-body d-flex m-3">
        <div className="input-group mb-2">
          <div className="w-50 text-wrap">
            <h5 className="text-center text-wrap">{this.props.task.name}</h5>
          </div>
          <div className="form-group col">
            <label htmlFor="ig" className="csnav-btn">
              <h5>Edit Task</h5>
              <button onClick={this.removeTask} className="btn btn-danger">
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
            </label>
            <div id="ig" className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <button onClick={this.addSubTask} className="btn btn-success">
                  Add
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
                onChange={this.updateTaskName}
                className="form-control"
                placeholder="Rename task"
                value={this.props.task.name}
                type="text"
              />
            </div>
          </div>
        </div>
        {this.renderSubTasks()}
      </div>
    );
  }
}

export default Task;
