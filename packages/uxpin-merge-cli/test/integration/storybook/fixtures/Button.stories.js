// NOTE: this file is a fixture, to be used by react-bootstrap.test.ts

import * as React from "react";
import * as ReactDOM from "react-dom";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const WithLabel = () => <Button label="with label"/>;
export const WithTextNode = () => <Button>with text node</Button>;
