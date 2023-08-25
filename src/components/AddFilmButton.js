import React from "react";
import { useState } from "react";
import { Message, Button, Icon } from "semantic-ui-react";
import NotifComp from "./NotifComp";

function AddFilmButton({ film }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const handleHideAlert = () => {
    setShowAlert(false);
  };

  const btnStyle = {
    backgroundColor: "#698474",
    color: "white",
  };

  const addFilm = () => {
    const filmsarr = JSON.parse(localStorage.getItem("favfilms")) || [];

    if (!filmsarr.some((existingFilm) => existingFilm.id === film.id)) {
      filmsarr.push(film);
      localStorage.setItem("favfilms", JSON.stringify(filmsarr));
      setShowNotif(true);
      setTimeout(() => {
        setShowNotif(false);
      }, 1000);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <Button style={btnStyle} attached="bottom" onClick={addFilm}>
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
