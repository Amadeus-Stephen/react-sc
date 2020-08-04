import React, { Component } from "react";

class SubTask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick() {
    this.props.removeSubTask(this.props.index);
  }
  handleChange(event) {
    this.props.updateSubTask(event.target.value, this.props.index);
  }
  render() {
    return (
      <div className="d-flex justify-content-end w-100">
        <div className="input-group mb-3 w-75 d-flex justify-content-end ">
          <div className="input-group-prepend">
            <button
              onClick={this.handleClick}
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
          <input
            onChange={this.handleChange}
            value={this.props.name}
            className="form-control"
            placeholder="subtask"
            type="text"
          />
        </div>
      </div>
    );
  }
}

export default SubTask;
