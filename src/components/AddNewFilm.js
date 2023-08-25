import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

function AddFilmButton() {
  const btnStyle = {
    margin: "20px",
    backgroundColor: "#698474",
    color: "white",
  };
  return (
    <>
      <Link to="/addfilm">
        <Button floated="right" style={btnStyle}>
          <Icon name="add" />
          Add new
        </Button>
      </Link>
    </>
  );
}

export default AddFilmButton;
