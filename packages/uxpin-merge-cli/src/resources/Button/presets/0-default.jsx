import * as React from "react";
import Button from "../Button";

const customFunction = () => "HelloWorld";

export default (
  <Button
    uxpId="button"
    className="button"
    name="name"
    label="label"
    value="value"
    onClick={customFunction()}
    disabled="true">
    Button
  </Button>
);
