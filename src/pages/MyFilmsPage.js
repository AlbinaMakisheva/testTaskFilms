import React from "react";
import { MenuComp } from "../components/MenuComp";
import { Grid, Header, Button } from "semantic-ui-react";
import FilmInListComp from "../components/FilmInListComp";
import DelFilmButton from "../components/DelFilmButton";
import { Link } from "react-router-dom";

import { useFilmContext } from "../context/LocalStorageContext";
import * as colors from "../store/colors";

function MyFilmsPage() {
  const { favoriteFilms, setActiveItem } = useFilmContext();

  return (
    <>
      <MenuComp />
      <Header as="h1" textAlign="center">
        My favorite films
      </Header>

      {favoriteFilms == "" ? (
        <>
          <Grid textAlign="center" style={{ padding: "10vh" }}>
            <Grid.Column>
              <p> No films :(</p>

              <Link to="/">
                <Button
                  style={{ backgroundColor: colors.back }}
                  onClick={() => setActiveItem("allFilms")}
                >
                  Start search
                </Button>
              </Link>
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <>
          <Grid style={{ padding: "10vh", backgroundColor: colors.back }}>
            {favoriteFilms.map((film, index) => (
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
