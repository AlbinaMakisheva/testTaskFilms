import React from "react";
import {
  Rating,
  Embed,
  Grid,
  Header,
  Item,
  Button,
  Icon,
} from "semantic-ui-react";
import AddFilmButton from "./AddFilmButton";
import { FilmFormComp } from "./FilmFormComp";
import NotifComp from "./NotifComp";
import { withState } from "react-searchkit";
import * as colors from "../store/colors";
import ImageWithFallback from "../funcs/imgFallback";

const FilmForm = withState(FilmFormComp);

function FilmDetailsComp({ film, updateDetails, filmdb, setFilmdb }) {
  const [open, setOpen] = React.useState(false);

  const setColor = { backgroundColor: colors.back };

  return (
    <>
      <Header as="h1" textAlign="center">
        {film.title}
      </Header>
      <Grid
        style={{
          padding: "10vh",
          minWidth: "90vw",
          backgroundColor: colors.back,
        }}
      >
        <Grid.Row>
          <Grid.Column style={{ minWidth: "35vw" }}>
            <ImageWithFallback
              src={film.poster}
              fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              alt={film.alt}
              result={film}
            />
          </Grid.Column>
          <Grid.Column
            width={8}
            style={{ display: "flex", flexDirection: "column", gap: " 3%" }}
          >
            <Item>
              <Item.Content>
                <Item.Header as="h3" style={{ fontWeight: "bold" }}>
                  {film.title}
                </Item.Header>
                <Item.Description>Description: {film.plot} </Item.Description>
                <Item.Extra>
                  <Rating
                    icon="star"
                    defaultRating={film.imdbRating / 2}
                    maxRating={5}
                  />
                  <p style={{ marginTop: "0.5em" }}>
                    {" "}
                    Genre: {film.genre.join(", ")}{" "}
                  </p>
                  <p> {film.year} year</p>
                  <p> Runtime: {film.runtime}</p>
                  <p> County: {film.country}</p>
                  <p> Actors: {film.actors}</p>
                  <Button.Group vertical>
                    <Button
                      aria-label="Edit film"
                      attached="bottom"
                      style={{
                        border: "1px solid gray",
                        minWidth: "40vw",
                        backgroundColor: "white",
                      }}
                      onClick={() => setOpen(true)}
                    >
                      <Icon name="pencil"></Icon>Edit film
                    </Button>
                    <AddFilmButton film={film} />
                  </Button.Group>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div style={setColor}>
        <Header as="h2" textAlign="center">
          Watch trailer
        </Header>
        <Embed id={film.trailer} source="youtube" />
      </div>
      {open ? (
        <NotifComp
          message={
            <FilmForm
              film={film}
              filmdb={filmdb}
              setFilmdb={setFilmdb}
              updateDetails={updateDetails}
            />
          }
          header="Edit film"
          open={open}
          button={false}
          changeOpen={() => setOpen(false)}
          size="large"
        />
      ) : null}
    </>
  );
}

export default FilmDetailsComp;
