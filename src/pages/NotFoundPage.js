import React from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useFilmContext } from "../context/LocalStorageContext";
import * as colors from "../store/colors";

function NotFoundPage() {
  const { setActiveItem } = useFilmContext();

  return (
    <>
      <Grid>
        <Grid.Column textAlign="center" style={{ paddingTop: "20vh" }}>
          <Header as="h2">Unknown page :(</Header>
          <Link to="/">
            <Button
              style={{ backgroundColor: colors.back }}
              onClick={() => setActiveItem("allFilms")}
              aria-label="Redirect to films list button"
              tabIndex="0"
            >
              Go home
            </Button>
          </Link>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default NotFoundPage;
