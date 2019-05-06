import React from "react";
import { SignUpForm } from "../forms";
const SignUpPage = ({ history }) => {
  return (
    <div>
      <SignUpForm history={history} />
    </div>
  );
};

export default SignUpPage;
