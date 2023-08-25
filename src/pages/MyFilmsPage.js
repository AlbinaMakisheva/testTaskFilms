import React from "react";
import { MenuComp } from "../components/MenuComp";
import { Grid, Header, Button } from "semantic-ui-react";
import FilmInListComp from "../components/FilmInListComp";
import DelFilmButton from "../components/DelFilmButton";
import { Link } from "react-router-dom";

function MyFilmsPage() {
  const favfilms = JSON.parse(localStorage.getItem("favfilms")) || [];
  const setActive = (val) => {
    window.localStorage.setItem("activemenu", JSON.stringify(val));
  };

  return (
    <>
      <MenuComp />
      <Header as="h1" textAlign="center">
        My favorite films
      </Header>

      {favfilms == "" ? (
        <>
          <Grid textAlign="center" style={{ padding: "10vh" }}>
            <Grid.Column>
              <p> No films :(</p>

              <Link to="/">
                <Button
                  style={{ backgroundColor: "#fcf8f3" }}
                  onClick={() => setActive("allFilms")}
                >
                  Start search
                </Button>
              </Link>
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <>
          <Grid style={{ padding: "10vh", backgroundColor: "#fcf8f3" }}>
            {favfilms.map((film, index) => (
              <FilmInListComp
                key={index}
                result={film}
                message="Film was successfully deleted"
                func={() => false}
                button={<DelFilmButton film={film} />}
              ></FilmInListComp>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default MyFilmsPage;
