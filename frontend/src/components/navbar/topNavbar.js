import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class TopNavbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.addTask = this.addTask.bind(this);
    this.switchSideBar = this.switchSideBar.bind(this);
  }
  logout(event) {
    event.preventDefault();
    axios
      .post("/user/logout")
      .then((response) => {
        //sends a post request to log user out of current session
        if (response.status === 200) {
          this.props.updateAppState({
            loggedIn: false,
            username: null,
          });
          window.location.pathname = "/";
        }
      })
      .catch((error) => {
        console.log("Logout error", error);
      });
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
  switchSideBar() {
    let sidebar = this.props.sidebar;
    sidebar = !sidebar;
    this.props.updateAppState({ sidebar });
  }
  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <nav className="csnav topnav w-100 navbar-dark bg-dark">
        <button onClick={this.switchSideBar} className="btn btn-primary m-1">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-list-ul"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
        </button>

        {this.props.project ? (
          <div className="csnav-btn">
            <h1>Project: {this.props.project.name}</h1>
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={this.addTask}
            >
              Add Task
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
            <button
              onClick={this.props.updateProject}
              className="btn btn-success m-1"
            >
              Save
            </button>
            <button className="btn btn-info">
              <Link
                to={{
                  pathname: "/project/settings",
                  state: this.props.id,
                }}
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-x-diamond-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.615L8 8.707l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.615-.707L7.293 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098l2.904 2.905z"
                  />
                </svg>
              </Link>
            </button>
          </div>
        ) : (
          ""
        )}
        {loggedIn ? (
          <div>
            <button onClick={this.logout} className="btn btn-danger m-1">
              <Link to="#">
                <h5 className="text-white">Logout</h5>
              </Link>
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-success m-1">
              <Link to="/login">
                <h5 className="text-white">Login</h5>
              </Link>
            </button>
            <button className="btn btn-primary m-1">
              <Link to="/signup">
                <h5 className="text-white">Signup</h5>
              </Link>
            </button>
          </div>
        )}
      </nav>
    );
  }
}

export default TopNavbar;
