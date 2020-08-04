import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SignupPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value, // updates state with input
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    // checks if form is filled out
    axios
      .post("/user/", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      })
      .then((response) => {
        if (response.data.error) {
          let msg = response.data.error.msg;
          this.props.addFlash({ success: false, msg });
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3">
            <i className="fas fa-user-plus"></i> Signup
          </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="text">Name</label>
              <input
                onChange={this.handleChange}
                value={this.state.username || ""}
                id="username"
                name="usermame"
                className="form-control"
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={this.handleChange}
                value={this.state.email || ""}
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={this.handleChange}
                value={this.state.password || ""}
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input
                type="password"
                onChange={this.handleChange}
                value={this.state.confirmPassword || ""}
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Re-Enter Password"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Signup
            </button>
          </form>
          <p className="lead mt-4">
            Have An Account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignupPage;
