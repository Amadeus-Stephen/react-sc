import React, { Component } from "react";
import { Link } from "react-router-dom";
class ProjectLink extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick(this.props.project._id);
  }
  render() {
    return (
      <button
        onClick={this.handleClick}
        className="btn text-left text-info csnav-btn mb-2"
      >
        <Link to="/project">
          <h5>{this.props.project.name}</h5>
        </Link>
      </button>
    );
  }
}

export default ProjectLink;
