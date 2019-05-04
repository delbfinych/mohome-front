import React, { Component } from "react";
import { withApiService } from "../hoc";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class SignIn extends Component {
  state = {
    email: "",
    password: "",
    passwordOk: true,
    emailOk: true,
    errors: []
  };
  validate = () => {
    const { email, password } = this.state;
    this.setState({
      passwordOk: true,
      emailOk: true
    });
    let errors = [];
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      errors.push("The Email field is not a valid e-mail address.");
      this.setState({ emailOk: false });
    }

    if (!/^\w{4,20}$/.test(password)) {
      errors.push(
        "The field password must be a string with a minimum length of 3 and a maximum length of 20 and it" +
          "must contain only letters, numbers and underscores"
      );
      this.setState({ passwordOk: false });
    }

    this.setState({ errors });
    return !errors.length;
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password: PasswordHash } = this.state;
    if (this.validate())
      this.props
        .signIn({ email, PasswordHash })
        .then(res => {
          console.log(res);
          cookies.set("id_token", res.data.response.accessToken);
          cookies.set("expiresIn", res.data.response.expiresIn);
          cookies.set("refreshToken", res.data.response.refreshToken);
          this.props.history.push("/");
        })
        .catch(err => {
          if (err.response.status === 401)
            this.setState({ errors: ["Authentication failed"] });
        });
  };
  onChange(e, type) {
    this.setState({
      [type]: e.target.value
    });
  }
  render() {
    const { email, password, emailOk, passwordOk, errors } = this.state;
    return (
      <div>
        <form className={"form"} onSubmit={this.onSubmit.bind(this)}>
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
              className={`form-control ${!passwordOk ? "is-invalid  " : ""}`}
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
          <div>
            Don't have an account?
            <Link to={"/sign-up"}> Sign up</Link>
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

export default withApiService(mapMethodToProps)(SignIn);
