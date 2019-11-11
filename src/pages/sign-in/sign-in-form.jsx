import React, { Component } from 'react';
import { withApiService } from '../../components/hoc';
import { Link, withRouter } from 'react-router-dom';
import { compose } from '../../helpers';
import routes from '../../routes';
class SignInForm extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    authError: false,
    errMsg: ''
  };

  onSubmit = e => {
    e.preventDefault();
    const { password, email } = this.state;
    this.setState({ authError: false, isLoading: true, errMsg: '' });
    setTimeout(() => {
      this.props
        .signIn({
          email,
          PasswordHash: password
        })
        .then(() => {
          this.props.history.push(routes.root.path);
        })
        .catch(err => {
          if (err.response) {
            console.log('Auth request status: ', err.response.status);
            if (Math.trunc(err.response.status / 100) === 4)
              this.setState({
                authError: true,
                isLoading: false,
                errMsg: 'Incorrect username or password.'
              });
          } else
            this.setState({
              authError: true,
              isLoading: false,
              errMsg: err.message
            });
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
    const { email, password, isLoading, authError, errMsg } = this.state;
    return (
      <div className={'sign-in-form'}>
        <form className={'form'} onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className={'sign-in-form__label'} htmlFor="email">
              Email address
            </label>
            <input
              name={'email'}
              id={'email'}
              className={`form-control`}
              onChange={this.handleUserInput}
              value={email}
              type={'text'}
              placeholder={'name@example.com'}
            />
          </div>
          <div className="form-group">
            <label className={'sign-in-form__label'} htmlFor="password">
              Password
            </label>
            <input
              name={'password'}
              id={'password'}
              className={`form-control`}
              onChange={this.handleUserInput}
              value={password}
              type={'password'}
              placeholder={'password'}
            />
          </div>
          {isLoading ? (
            <button disabled className={'ok-btn'} type={'submit'}>
              Signing in
            </button>
          ) : (
            <button className={'ok-btn'} type={'submit'}>
              Sign in
            </button>
          )}
          {authError ? (
            <div className={'error'}>
              <i
                onClick={() => {
                  this.setState({ authError: false });
                }}
                className="zmdi zmdi-close"
              />
              <span>{errMsg}</span>
            </div>
          ) : null}
          <div className={'create-account-callout'}>
            New to Mohome? <Link to={routes.signUp.path}>Create an account.</Link>
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
