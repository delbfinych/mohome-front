import React, { Component } from "react";
import { withApiService } from "../../components/hoc";
import { withRouter } from "react-router-dom";
import { compose } from "../../helpers";
import routes from "../../routes";

class SignUpForm extends Component {
  state = {
    username: "",
    email: "",
    formErrors: { email: "", password: "", username: "" },
    password: "",
    emailValid: false,
    passwordValid: false,
    usernameValid: false,
    usernameClass: "",
    passwordClass: "",
    emailClass: "",
    formValid: false,
    isLoading: false,
    isEmailExist: true,
    isValidation: false,
    isNetworkError: false
  };

  validateField = (fieldName, value) => {
    let {
      formErrors,
      emailValid,
      passwordValid,
      usernameValid,
      emailClass,
      passwordClass,
      usernameClass,
      isEmailExist
    } = this.state;

    switch (fieldName) {
      case "email":
        emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
        emailClass = emailValid && !isEmailExist ? "is-valid" : "is-invalid";
        if (!emailValid) formErrors.email = "Email is invalid";
        else if (isEmailExist) formErrors.email = "Email is already taken";
        else formErrors.email = "";
        break;
      case "password":
        passwordValid = /^[a-zA-Z0-9]{4,}$/.test(value);
        passwordClass = passwordValid ? "is-valid" : "is-invalid";
        formErrors.password = passwordValid
          ? ""
          : "Make sure it's at least 4 characters and it contains only alphanumeric characters";
        break;
      case "username":
        usernameValid = /^[a-zA-Z0-9_А-Яа-я]{4,}$/.test(value);
        usernameClass = usernameValid ? "is-valid" : "is-invalid";
        formErrors.username = usernameValid
          ? ""
          : "Username may only contain alphanumeric characters or underscores";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        emailValid,
        passwordValid,
        usernameValid,
        usernameClass,
        passwordClass,
        emailClass
      },
      this.validateForm
    );
  };
  validateForm = () => {
    const { emailValid, passwordValid, usernameValid } = this.state;
    this.setState({
      formValid: emailValid && passwordValid && usernameValid
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { username, password, email, formValid } = this.state;
    if (formValid) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.props
          .signUp({ username, password, email })
          .then(() => {
            this.props.history.push(routes.root.path);
          })
          .catch(err => {
            this.setState({ isLoading: false, isNetworkError: true, errMsg: err.message });
          });
      }, 500);
    }
  };
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
    if (name === "email") {
      this.setState({ isValidation: true });
      setTimeout(() => {
        this.props
          .validateUser(value)
          .then(res => {
            this.setState({
              isEmailExist: true
            });
          })
          .catch(err => {
            this.setState({
              isEmailExist: false
            });
          })
          .finally(() => {
            this.setState({ isValidation: false }, () => {
              this.validateField(name, value);
            });
          });
      }, 200);
    }
  };
  render() {
    const {
      username,
      email,
      password,
      formValid,
      formErrors,
      usernameClass,
      passwordClass,
      emailClass,
      isLoading,
      isValidation,
      isNetworkError,
      errMsg
    } = this.state;
    return (
      <div className={"sign-up-form"}>
        <form className={"form"} onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className={"sign-up-form__label"} htmlFor="email">
              Username
            </label>
            <input
              name={"username"}
              id={"username"}
              className={`form-control ${usernameClass}`}
              onChange={this.handleUserInput}
              value={username}
              type={"text"}
              placeholder={"username"}
            />
            <div className={"user-input-error"}>{formErrors.username}</div>
          </div>
          <div className="form-group">
            <label className={"sign-up-form__label"} htmlFor="email">
              Email address
            </label>
            <input
              name={"email"}
              id={"email"}
              className={`form-control ${
                isValidation ? "form-control-validation" : emailClass
              }`}
              onChange={this.handleUserInput}
              value={email}
              type={"text"}
              placeholder={"name@example.com"}
            />
            <div className={"user-input-error"}>{formErrors.email}</div>
          </div>
          <div className="form-group">
            <label className={"sign-up-form__label"} htmlFor="password">
              Password
            </label>
            <input
              name={"password"}
              id={"password"}
              className={`form-control ${passwordClass}`}
              onChange={this.handleUserInput}
              value={password}
              type={"password"}
              placeholder={"password"}
            />
            <div className={"user-input-error"}>{formErrors.password}</div>
          </div>
          {isLoading ? (
            <button disabled className={"ok-btn"} type={"submit"}>
              Creating the account
            </button>
          ) : (
            <button disabled={!formValid} className={"ok-btn"} type={"submit"}>
              Create an account
            </button>
          )}
          {isNetworkError && (
            <div className={"error"}>
              <i
                onClick={() => {
                  this.setState({ isNetworkError: false });
                }}
                className="zmdi zmdi-close"
              />
              <span>{errMsg}</span>
            </div>
          )}
        </form>
      </div>
    );
  }
}
const mapMethodToProps = service => {
  return {
    signUp: service.signUp,
    validateUser: service.validateUser
  };
};
export default compose(
  withApiService(mapMethodToProps),
  withRouter
)(SignUpForm);
