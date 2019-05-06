import React from "react";
import { SignInForm } from "../forms";
const SignIn = ({ history }) => {
  return (
    <div>
      <SignInForm history={history} />
    </div>
  );
};

export default SignIn;
