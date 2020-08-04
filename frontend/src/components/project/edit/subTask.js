import React, { Component } from "react";

class SubTask extends Component {
  constructor(props) {
    super(props);
    this.removeSubTask = this.removeSubTask.bind(this);
    this.updateSubStatus = this.updateSubStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  removeSubTask() {
    this.props.removeSubTask(this.props.index);
  }
  updateSubStatus() {
    this.props.updateSubTaskStatus(this.props.index);
  }
  handleChange(event) {
    this.props.updateSubTaskName(event.target.value, this.props.index);
    //this.props.updateSubTask(event.target.value, this.props.index);
  }
  render() {
    return (
      <div className="d-flex justify-content-end w-100">
        <div className="input-group  mb-3 w-100 d-flex justify-content-end ">
          <div className="input-group-prepend">
            <button
              onClick={this.removeSubTask}
              className="btn btn-danger "
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
          <input
            onChange={this.handleChange}
            value={this.props.name}
            className="form-control"
            placeholder="subtask"
            type="text"
          />
          <button
            onClick={this.updateSubStatus}
            className={`btn   ${
              this.props.completed ? "btn-success" : "btn-warning"
            }`}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-check2-circle"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default SubTask;
