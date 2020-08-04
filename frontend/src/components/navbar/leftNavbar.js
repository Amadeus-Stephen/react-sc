import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjectLink from "./links/projectLink";
class LeftNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [], active: false };
    this.renderProjects = this.renderProjects.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clickProjectLink = this.clickProjectLink.bind(this);
    this.wrapperRef = React.createRef();
    this.overLayRef = React.createRef();
  }
  componentDidMount() {
    this.props.socket.emit("getProjects");
    let active = this.props.active;
    this.setState({ active });
    this.props.socket.on("getProjects", (projects) => {
      this.setState({ projects });
    });
  }
  componentDidUpdate() {
    const wrapper = this.wrapperRef.current;
    const overlay = this.overLayRef.current;
    if (this.props.active !== this.state.active) {
      let active = this.props.active;
      this.setState({ active });
      wrapper.classList.toggle("is-nav-active");
      overlay.classList.toggle("is-nav-active");
    }
  }
  handleClick() {
    let sidebar = this.props.active;
    sidebar = !sidebar;
    this.props.updateAppState({ sidebar });
  }
  clickProjectLink(id) {
    let sidebar = this.props.active;
    sidebar = !sidebar;
    this.props.updateAppState({ sidebar, id });
  }
  renderProjects() {
    return this.state.projects.map((i, index) => {
      return (
        <ProjectLink key={index} project={i} onClick={this.clickProjectLink} />
      );
    });
  }

  render() {
    return (
      <nav>
        <div ref={this.wrapperRef} className="csnav leftnav bg-dark">
          <div className="col">
            <h2 className="mb-0">
              <button
                onClick={this.handleClick}
                className="btn text-left  csnav-btn "
                type="button"
              >
                <Link to="/">
                  <h5 className="text-info">
                    Home
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-house ml-1"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                      />
                    </svg>
                  </h5>
                </Link>
              </button>
            </h2>
            <div className="d-block">
              <div className="bg-dark card mb-2">
                <h2 className="mb-0">
                  <button
                    onClick={this.handleClick}
                    className="btn text-left  csnav-btn "
                    type="button"
                  >
                    <Link to="/create/project">
                      <h5 className="text-info">
                        New Project
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-chat-left-quote ml-1"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"
                          />
                        </svg>
                      </h5>
                    </Link>
                  </button>
                </h2>
              </div>
            </div>
            <h4>
              Projects
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-chat-left ml-1"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
              </svg>
            </h4>
            <div className="csnavBox">{this.renderProjects()}</div>
          </div>
        </div>
        <div
          onClick={this.handleClick}
          ref={this.overLayRef}
          className="overlay"
        ></div>
      </nav>
    );
  }
}

export default LeftNavbar;
