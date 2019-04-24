import React from "react";
import { ApiServiceConsumer } from "../api-service-context";

const withApiService = mapMethodsToProps => Wrapped => {
  return props => {
    return (
      <ApiServiceConsumer>
        {apiService => {
          const serviceProps = mapMethodsToProps(apiService);

          return <Wrapped {...props} {...serviceProps} />;
        }}
      </ApiServiceConsumer>
    );
  };
};

export default withApiService;
