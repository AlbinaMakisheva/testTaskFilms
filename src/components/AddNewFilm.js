import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import * as colors from "../store/colors";

function AddFilmButton() {
  const btnStyle = {
    margin: "20px",
    backgroundColor: colors.green,
    color: colors.base,
  };
  return (
    <>
      <Link to="/addfilm">
        <Button floated="right" style={btnStyle} aria-label="Add new film">
          <Icon name="add" />
          Add new
        </Button>
      </Link>
    </>
  );
}

export default AddFilmButton;
