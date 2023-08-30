import React from "react";
import { useState } from "react";
import { Message, Button, Icon } from "semantic-ui-react";
import NotifComp from "./NotifComp";
import { useFilmContext } from "../context/LocalStorageContext";
import * as colors from "../store/colors";

function AddFilmButton({ film }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const btnStyle = {
    backgroundColor: colors.green,
    color: colors.base,
    minWidth: "40vw",
  };

  const { addFavfilm } = useFilmContext();

  return (
    <>
      <Button
        style={btnStyle}
        attached="bottom"
        aria-label={`Add ${film.title} to my films`}
        onClick={() => {
          addFavfilm(film, setShowNotif, setShowAlert);
        }}
      >
        {" "}
        <Icon name="add" />
        Add to my films
      </Button>
      {showNotif && (
        <NotifComp
          message="Film was added"
          header="Added film"
          open={showNotif}
          button={false}
          size="small"
          changeOpen={() => setShowNotif(false)}
        />
      )}
      {showAlert && (
        <NotifComp
          message="Film is already in your list"
          header="Error"
          open={showAlert}
          button={false}
          size="small"
          changeOpen={() => setShowAlert(false)}
        />
      )}
    </>
  );
}

export default AddFilmButton;
