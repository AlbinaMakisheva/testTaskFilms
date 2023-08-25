import React from "react";
import { Button, Icon } from "semantic-ui-react";

function DelFilmButton({ film }) {
  const favfilms = JSON.parse(localStorage.getItem("favfilms")) || [];

  const deletefavfilm = () => {
    const newfavfilms = favfilms.filter((delfilm) => delfilm.id !== film.id);
    window.localStorage.setItem("favfilms", JSON.stringify(newfavfilms));
    setTimeout(()=>{
      window.location.reload(true)
    }, 1500
    )
    
  };

  const btnStyle = { backgroundColor: "#be3144", color: "white" };

  return (
    <>
      <Button style={btnStyle} onClick={deletefavfilm} attached="bottom">
        {" "}
        <Icon name="trash" />
        Delete
      </Button>
    </>
  );
}

export default DelFilmButton;
