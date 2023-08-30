import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useFilmContext } from "../context/LocalStorageContext";
import * as colors from "../store/colors";

function DelFilmButton({ film }) {
  const { deletefavfilm } = useFilmContext();

  const btnStyle = { backgroundColor: colors.danger, color: colors.base };

  return (
    <>
      <Button
        style={btnStyle}
        onClick={() => deletefavfilm(film)}
        attached="bottom"
        aria-label="Delete film"
      >
        {" "}
        <Icon name="trash" />
        Delete
      </Button>
    </>
  );
}

export default DelFilmButton;
