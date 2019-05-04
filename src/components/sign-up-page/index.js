import React, { Component } from "react";
import { withApiService } from "../hoc";

class SignUp extends Component {
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
        "The field username must be a string with a minimum length of 3 and a maximum length of 20 and it" +
          "must contain only letters, numbers and underscores"
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
        "The field password must be a string with a minimum length of 4 and a maximum length of 20 and it" +
          "must contain only letters, numbers and underscores"
      );
      this.setState({ passwordOk: false });
    } else {
      this.setState({ passwordOk: true });
    }

    this.setState({ errors });
    return !errors.length;
  };

  onSubmit = e => {
    e.preventDefault();
    const { errors, usernameOk, emailOk, passwordOk, ...body } = this.state;
    if (this.validate())
      this.props
        .signUp(body)
        .then(res => {
          this.props.history.push("/sign-in");
        })
        .catch(err => console.log(err.response));
  };
  onChange(e, type) {
    this.setState({
      [type]: e.target.value
    });
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
      <div>
        <form className={"form "} onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input
              id={"username"}
              className={`form-control ${!usernameOk ? "is-invalid" : ""}`}
              onBlur={this.validate}
              onChange={e => {
                this.onChange(e, "username");
                this.validate();
              }}
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
              onBlur={this.validate}
              onChange={e => {
                this.onChange(e, "email");
                this.validate();
              }}
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
              onBlur={this.validate}
              onChange={e => {
                this.onChange(e, "password");
                this.validate();
              }}
              value={password}
              type={"password"}
              placeholder={"password"}
            />
          </div>
          <div className={"form-group"}>
            {errors.map(e => (
              <div className={"form-text"} key={e}>
                {e}
              </div>
            ))}
          </div>
          <button className={"btn btn-primary"} type={"submit"}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    signUp: service.signUp
  };
};

export default withApiService(mapMethodToProps)(SignUp);
