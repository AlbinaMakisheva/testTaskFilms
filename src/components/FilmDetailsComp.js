import React from "react";
import {
  Rating,
  Embed,
  Grid,
  Header,
  Image,
  Item,
  Button,
  Icon,
} from "semantic-ui-react";
import AddFilmButton from "./AddFilmButton";
import { FilmFormComp } from "./FilmFormComp";
import NotifComp from "./NotifComp";
import { withState } from "react-searchkit";

const FilmForm = withState(FilmFormComp);

function FilmDetailsComp({ film, updateDetails, filmdb, setFilmdb }) {
  const [open, setOpen] = React.useState(false);

  const setColor = { backgroundColor: "#fcf8f3" };

  return (
    <>
      <Header as="h1" textAlign="center">
        {film.title}
      </Header>
      <Grid style={{ padding: "10vh", backgroundColor: "#fcf8f3" }}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={film?.poster ?? film.image} size="huge" wrapped />
          </Grid.Column>
          <Grid.Column width={10}>
            <Item>
              <Item.Content style={{ marginTop: "1em", padding: "1em" }}>
                <Item.Header as="h3" style={{ fontWeight: "bold" }}>
                  {film.title}
                </Item.Header>
                <Item.Meta>Description: {film.plot} </Item.Meta>
                <Item.Description>
                  <Rating
                    icon="star"
                    defaultRating={film.imdbRating}
                    maxRating={10}
                  />
                  <p style={{ marginTop: "0.5em" }}> Genre: {film.genre} </p>
                  <p> {film.year} year</p>
                  <p> Runtime: {film.runtime}</p>
                  <p> County: {film.country}</p>
                  <p> Actors: {film.actors}</p>
                  <AddFilmButton film={film} />
                </Item.Description>
              </Item.Content>
            </Item>
          </Grid.Column>
          <Button style={setColor} onClick={() => setOpen(true)}>
            <Icon name="pencil"></Icon>Edit
          </Button>
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
