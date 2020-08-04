import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Route } from "react-router-dom";
import "./App.css";
// components
import TopNavbar from "./components/navbar/topNavbar";
import SignupPage from "./components/user/signupPage";
import LoginPage from "./components/user/loginPage";
import HomePage from "./components/homePage";
import CreateProjectPage from "./components/project/create/createProjectPage";
import LeftNavbar from "./components/navbar/leftNavbar";
import ThrowFlash from "./components/util/throwFlash";
import EditProjectPage from "./components/project/edit/editProjectPage";
import SettingsProjectPage from "./components/project/edit/settingsProjectPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      flashes: [],
      project: null,
      id: null,
      sidebar: false,
    };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateAppState = this.updateAppState.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.addFlash = this.addFlash.bind(this);
    this.overLayRef = React.createRef();
    this.socket = io.connect("/");
  }
  componentDidMount() {
    this.getUser(); //tries to get the user data
    this.socket.on("init", (data) => {
      console.log(data);
    });
  }
  updateAppState(stateObject) {
    this.setState(stateObject);
  }

  getUser() {
    axios.get("/user/").then((response) => {
      if (response.data.user) {
        // if express sees that there is a authenicated
        // user saved in the session it will return the users data
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
        });
      } else {
        //if no user is saved in the express session it will simply go about it's day
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null,
        });
      }
    });
  }
  updateProject() {
    axios
      .post("/project/update", {
        project: this.state.project,
        id: this.state.project._id,
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.error) {
            let msg = response.data.error.msg;
            this.addFlash({ success: false, msg });
          } else {
            if (response.data.success) {
              let msg = response.data.success.msg;
              this.addFlash({ success: true, msg });
            } else {
              this.addFlash({
                success: false,
                msg: "Could not update project",
              });
            }
          }
        }
      });
  }
  addFlash(flash) {
    let flashes = this.state.flashes;
    flashes.push(flash);
    this.setState({ flashes });
  }
  renderFlash() {
    return this.state.flashes.map(({ msg, success }, index) => {
      return (
        <ThrowFlash
          updateAppState={this.updateAppState}
          msg={msg}
          success={success}
          index={index}
          flashes={this.state.flashes}
          key={index}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <TopNavbar
          updateAppState={this.updateAppState}
          updateProject={this.updateProject}
          loggedIn={this.state.loggedIn}
          project={this.state.project}
          id={this.state.id}
          sidebar={this.state.sidebar}
        />
        <LeftNavbar
          updateAppState={this.updateAppState}
          username={this.state.username}
          active={this.state.sidebar}
          socket={this.socket}
        />
        <div className="container mt-5">
          {this.renderFlash()}
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                user={this.state.username}
                loggedIn={this.state.loggedIn}
                getUser={this.getUser}
              />
            )}
          />
          <Route
            path="/login"
            render={() => (
              <LoginPage
                updateAppState={this.updateAppState}
                addFlash={this.addFlash}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => <SignupPage addFlash={this.addFlash} />}
          />
          <Route
            path="/project"
            exact
            render={() => (
              <EditProjectPage
                updateAppState={this.updateAppState}
                id={this.state.id}
                project={this.state.project}
                addFlash={this.addFlash}
                socket={this.socket}
              />
            )}
          />
          <Route
            path="/project/settings/"
            render={(data) => (
              <SettingsProjectPage
                updateAppState={this.updateAppState}
                addFlash={this.addFlash}
                id={data.location.state}
                project={this.state.project}
                socket={this.socket}
              />
            )}
          />
          <Route
            path="/create/project"
            render={() => (
              <CreateProjectPage
                addFlash={this.addFlash}
                socket={this.socket}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
