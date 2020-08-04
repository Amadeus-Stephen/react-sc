import React, { Component } from "react";

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = { isDialog: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.overLayRef = React.createRef();
  }
  componentDidMount() {
    console.log(this.props);
  }
  componentDidUpdate() {
    const overlay = this.overLayRef.current;
    if (this.props.isDialog !== this.state.isDialog) {
      let isDialog = this.props.isDialog;
      this.setState({ isDialog });
      overlay.classList.toggle("is-nav-active");
    }
  }
  handleClick() {
    let isDialog = this.props.isDialog;
    isDialog = !isDialog;
    this.props.updateAppState({ isDialog, isInput: false });
    console.log(isDialog);
  }
  handleChange(event) {
    this.props.updateAppState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div>
        {this.props.isDialog ? (
          <div className="dialog bg-dark col-md-6 m-auto">
            <button onClick={this.handleClick} className="dialogBtn bg-dark">
              &times;
            </button>

            {this.props.isInput ? (
              <div>
                <div className="dialogText">{this.props.isInput}</div>
                <form className="form-group">
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => this.handleChange(e)}
                    value={this.props.password}
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </form>
              </div>
            ) : (
              <div className="dialogText">{this.props.isDialog}</div>
            )}
            <div className="dialogOptions">
              <button onClick={this.handleClick} className="btn btn-success">
                Cancel
              </button>
              <button
                onClick={this.props.handleDelete}
                className="btn btn-danger"
              >
                Yes,Delete !
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div
          onClick={this.handleClick}
          ref={this.overLayRef}
          className="overlay"
        ></div>
      </div>
    );
  }
}

export default Dialog;
