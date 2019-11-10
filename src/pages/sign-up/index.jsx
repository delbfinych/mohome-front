import React from "react";
import  SignUpForm  from "./sign-up-form";
import { Logo } from "../../constants";
const SignUpPage = () => {
  return (
    <div>
      <img className="sign-page-logo" height={"60px"} src={Logo} alt="" />
      <div className={"logo-text"}>Join Mohome</div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
