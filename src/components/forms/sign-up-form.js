import React, { Component } from "react";
import { withApiService } from "../hoc";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class SignUpForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordOk: true,
    usernameOk: true,
    emailOk: true,
    errors: []
  };
  validate = () => {
    const { username, email, password } = this.state;
    let errors = [];

    if (!/^\w{3,20}$/.test(username)) {
      errors.push(
        `The Username field  must be a latin string with a minimum length of 3 and a maximum length of 20 and it
          must contain only letters, numbers and underscores`
      );
      this.setState({ usernameOk: false });
    } else {
      this.setState({ usernameOk: true });
    }

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      errors.push("The Email field is not a valid e-mail address.");
      this.setState({ emailOk: false });
    } else {
      this.setState({ emailOk: true });
    }

    if (!/^\w{4,20}$/.test(password)) {
      errors.push(
        `The Password field  must be a latin string with a minimum length of 4 and a maximum length of 20 and it must contain only letters, numbers and underscores`
      );
      this.setState({ passwordOk: false });
    } else {
      this.setState({ passwordOk: true });
    }

    this.setState({ errors });
  };

  onSubmit = e => {
    e.preventDefault();
    const { errors, usernameOk, emailOk, passwordOk, ...body } = this.state;
    if (!errors.length)
      this.props
        .signUp(body)
        .then(res => {
          cookies.set("id_token", res.data.response.accessToken);
          cookies.set("expiresIn", res.data.response.expiresIn);
          cookies.set("refreshToken", res.data.response.refreshToken);
          this.props.history.push("/");
        })
        .catch(err => {
          this.setState({ errors: [err.message] });
        });
  };
  onChange(e, type) {
    this.setState(
      {
        [type]: e.target.value
      },
      this.validate
    );
  }
  render() {
    const {
      username,
      email,
      password,
      errors,
      usernameOk,
      emailOk,
      passwordOk
    } = this.state;
    return (
      <form className={"form "} onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            id={"username"}
            className={`form-control ${!usernameOk ? "is-invalid" : ""}`}
            onChange={e => this.onChange(e, "username")}
            value={username}
            type={"text"}
            placeholder={"username"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id={"email"}
            className={`form-control ${!emailOk ? "is-invalid" : ""}`}
            onChange={e => this.onChange(e, "email")}
            value={email}
            type={"text"}
            placeholder={"name@exmaple.com"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id={"password"}
            className={`form-control ${!passwordOk ? "is-invalid" : ""}`}
            onChange={e => this.onChange(e, "password")}
            value={password}
            type={"password"}
            placeholder={"password"}
          />
        </div>
        <div className={"form-group"}>
          {errors.map(e => (
            <div className={"form-text form-text__error"} key={e}>
              {e}
            </div>
          ))}
        </div>
        <button className={"btn btn-primary"} type={"submit"}>
          Sign Up
        </button>
      </form>
    );
  }
}
const mapMethodToProps = service => {
  return {
    signUp: service.signUp
  };
};
export default withApiService(mapMethodToProps)(SignUpForm);
