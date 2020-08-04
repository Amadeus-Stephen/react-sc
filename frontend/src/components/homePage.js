import React, { Component } from "react";
import { BrowserRouter as Redirect } from "react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }
  componentDidMount() {
    this.props.getUser(); // makes sure it gets the updated user on mount
  }
  render() {
    // in this expamle this isnt used
    // but if  you wanted you should block the user from seeing a component if this.props.loggedIn returned false
    if (this.state.redirect) {
      return (
        <Redirect to={{ pathname: "/login", state: { refferrer: "error" } }} />
      );
    }
    return (
      <div className="cspage ">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              Hello
              {this.props.loggedIn ? this.props.user : " "}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
