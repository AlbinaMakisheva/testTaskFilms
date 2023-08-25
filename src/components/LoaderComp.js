import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoaderComp = () => (
  <Dimmer active>
    <Loader>Loading</Loader>
  </Dimmer>
);

export default LoaderComp;
