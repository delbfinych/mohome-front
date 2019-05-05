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
        `The Password field  must be a latin string with a minimum length of 3 and a maximum length of 20 and it 
          must contain only letters, numbers and underscores`
      );
      this.setState({ passwordOk: false });
    }

    this.setState({ errors });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password: PasswordHash, errors } = this.state;
    if (!errors.length)
      this.props
        .signIn({ email, PasswordHash })
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
    const { email, password, emailOk, passwordOk, errors } = this.state;
    return (
      <div>
        <form className={"form"} onSubmit={this.onSubmit.bind(this)}>
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
              className={`form-control ${!passwordOk ? "is-invalid  " : ""}`}
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
            Sign In
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
