import React from "react";
import  SignInForm  from "./sign-in-form";
import { Logo } from "../../constants";
const SignIn = () => {
  return (
    <div>
      <img className="sign-page-logo" height={"60px"} src={Logo} alt="" />
      <div className={"logo-text"}>Sign in to Mohome</div>
      <SignInForm />
    </div>
  );
};

export default SignIn;
