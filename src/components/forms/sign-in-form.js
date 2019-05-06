import React, { Component } from "react";
import { withApiService } from "../hoc";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { compose } from "../../utils";
const cookies = new Cookies();

class SignInForm extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    authError: false
  };

  onSubmit = e => {
    e.preventDefault();
    const { password, email } = this.state;
    this.setState({ authError: false, isLoading: true });
    setTimeout(() => {
      this.props
        .signIn({
          email,
          PasswordHash: password
        })
        .then(res => {
          cookies.set("id_token", res.data.response.accessToken);
          cookies.set("expiresIn", res.data.response.expiresIn);
          cookies.set("refreshToken", res.data.response.refreshToken);
          this.props.history.push("/");
        })
        .catch(err => {
          this.setState({ authError: true, isLoading: false });
        });
    }, 500);
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { email, password, isLoading, authError } = this.state;
    return (
      <div className={"sign-in-form"}>
        <form className={"form"} onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className={"sign-in-form__label"} htmlFor="email">
              Email address
            </label>
            <input
              name={"email"}
              id={"email"}
              className={`form-control`}
              onChange={this.handleUserInput}
              value={email}
              type={"text"}
              placeholder={"name@exmaple.com"}
            />
          </div>
          <div className="form-group">
            <label className={"sign-in-form__label"} htmlFor="password">
              Password
            </label>
            <input
              name={"password"}
              id={"password"}
              className={`form-control`}
              onChange={this.handleUserInput}
              value={password}
              type={"password"}
              placeholder={"password"}
            />
          </div>
          {isLoading ? (
            <button disabled className={"ok-btn"} type={"submit"}>
              Signing in
            </button>
          ) : (
            <button className={"ok-btn"} type={"submit"}>
              Sign in
            </button>
          )}
          {authError ? (
            <div className={"error"}>
              <i
                onClick={() => {
                  this.setState({ authError: false });
                }}
                className="zmdi zmdi-close"
              />
              <span>Incorrect username or password.</span>
            </div>
          ) : null}
          <div className={"create-account-callout"}>
            New to Mohome? <Link to={"/sign-up"}>Create an account.</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    signIn: service.signIn
  };
};

export default compose(
  withApiService(mapMethodToProps),
  withRouter
)(SignInForm);
