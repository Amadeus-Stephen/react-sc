import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Dialog from "../../util/dialog";
import axios from "axios";

class SettingsProjectPage extends Component {
  constructor() {
    super();
    this.state = {
      redirectTo: null,
      isDialog: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    if (!this.props.project) {
      this.setState({ redirectTo: "/" });
    }
  }
  handleChange(event) {
    console.log(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  handleDelete() {
    console.log(this.props.id);

    axios.post("/project/delete", { id: this.props.id }).then((response) => {
      if (response.status === 200) {
        if (response.data.error) {
          let msg = response.data.error;
          this.props.addFlash({ success: false, msg });
        } else {
          if (response.data.success) {
            let msg = response.data.success.msg;
            this.props.addFlash({ success: true, msg });
            this.props.socket.emit("getProjects");
            this.setState({ redirectTo: "/" });
          }
          console.log(response.data);
        }
      }
    });
  }
  updateLocalState(stateObject) {
    this.setState(stateObject);
  }
  render() {
    if (this.state.redirectTo) {
      // will redirect user if this.state.redirectTo returns true
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="col-md-6 m-auto ">
          <div className="card card-body">
            <h1 className="text-center mb-3">Settings</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Rename Project</label>
                <input
                  type="input"
                  onChange={(e) => this.handleChange(e)}
                  value={this.props.name}
                  id="name"
                  className="form-control"
                  placeholder="New Project Name"
                />
              </div>
              <div className="settingsOpt">
                <button type="submit" className="btn btn-success ">
                  save
                </button>
                <button
                  onClick={() => {
                    this.setState({
                      isDialog: "Are you sure you want to delete this project?",
                    });
                  }}
                  className="btn btn-danger"
                >
                  delete project
                </button>
              </div>
            </form>
            <button className="btn btn-primary mt-3">back</button>
          </div>
          <Dialog
            updateAppState={this.updateLocalState}
            handleDelete={() => {
              this.handleDelete();
            }}
            isDialog={this.state.isDialog}
            isInput={this.state.isInput}
            password={this.state.password}
          />
        </div>
      );
    }
  }
}

export default SettingsProjectPage;
