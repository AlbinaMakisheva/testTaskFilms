import React from "react";
import { useState } from "react";
import { Message, Button, Icon } from "semantic-ui-react";
import NotifComp from "./NotifComp";
import { useFilmContext } from "../context/LocalStorageContext";
import * as colors from "../store/colors";

function AddFilmButton({ film }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const handleHideAlert = () => {
    setShowAlert(false);
  };

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
        <Message error onDismiss={handleHideAlert} style={{ margin: "2%" }}>
          <Message.Header>Error</Message.Header>
          <p>Film is already added to your list.</p>
        </Message>
      )}
    </>
  );
}

export default AddFilmButton;
