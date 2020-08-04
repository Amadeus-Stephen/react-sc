import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Task from "./Task";
class CreateProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], name: "", redirectTo: null };
    this.addTask = this.addTask.bind(this);
    this.updateTasks = this.updateTasks.bind(this);
    this.createProject = this.createProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  createProject(e) {
    e.preventDefault();
    axios.post("/project/create", this.state).then((response) => {
      if (response.status === 200) {
        if (response.data.errors) {
          response.data.errors.map(({ msg }) => {
            this.props.addFlash({ success: false, msg });
          });
        } else {
          try {
            let msg = response.data.success;
            this.props.addFlash({ success: true, msg });
            this.props.socket.emit("getProjects");
            this.setState({ redirectTo: "/" });
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  }
  updateTasks(taskObeject) {
    this.setState(taskObeject);
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value, // updates state with input
    });
  }
  addTask() {
    const taskObeject = { name: "Task", subtasks: [], completed: false };
    let tasks = this.state.tasks;
    tasks.push(taskObeject);
    this.setState({ tasks });
  }
  renderTasks() {
    return this.state.tasks.map((i, index) => {
      return (
        <Task
          key={index}
          task={i}
          tasks={this.state.tasks}
          updateTasks={this.updateTasks}
          index={index}
        />
      );
    });
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <form onSubmit={this.createProject}>
              <div className="form-group ">
                <label htmlFor="name">Name</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.name}
                  className="form-control"
                  id="name"
                  placeholder="Enter Project Name"
                  type="text"
                />
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={this.addTask}
                >
                  Add Tasks
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
              {this.renderTasks()}
              <div className="form-group row">
                <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">
                    Create Project
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProjectPage;
