import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Task from "./Task";

class EditProjectPage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { redirectTo: null, id: null };
    this.updateTasks = this.updateTasks.bind(this);
    this.addTask = this.addTask.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    this.props.socket.emit("getProjectData", this.props.id);
    this.props.socket.on("getProjectData", (data) => {
      console.log(data);
      if (data.success) {
        let project = data.success.project;
        this.props.updateAppState({ project });
        let id = this.props.id;
        this.setState({ id });
      }
    });
    // this.props.getUser(); // makes sure it gets the updated user on mount
  }
  componentDidUpdate() {
    try {
      if (this.props.id !== this.state.id) {
        console.log("project changes");
        this.props.socket.emit("getProjectData", this.props.id);
      }
    } catch (err) {
      this.setState({ redirectTo: "/" });
    }
  }
  componentWillUnmount() {
    this.props.updateAppState({ project: null, id: null });
    this._isMounted = false;
  }

  addTask() {
    try {
      const taskObject = { name: "Task", subtasks: [], completed: false };
      let tasks = this.props.project.tasks;
      tasks.push(taskObject);
      this.props.updateAppState({ tasks });
    } catch {
      console.log("could not get project data");
    }
  }
  updateTasks(taskObject) {
    this.props.updateAppState(taskObject);
  }
  renderTasks() {
    return this.props.project.tasks.map((i, index) => {
      return (
        <Task
          task={i}
          tasks={this.props.project.tasks}
          updateTasks={this.updateTasks}
          index={index}
          key={index}
        />
      );
    });
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="cspage p-3">
          <div className="d-flex justify-content-end flex-wrap">
            {this.props.project ? this.renderTasks() : ""}
          </div>
        </div>
      );
    }
  }
}

export default EditProjectPage;
