import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating, Item, Grid, Divider } from "semantic-ui-react";
import { ReactSearchKit } from "react-searchkit";
import searchApi from ".././dbAPI";
import AddFilmButton from "./AddFilmButton";
import NotifComp from "./NotifComp";
import Okbth from "./OkBth";
import { useFilmContext } from "../context/LocalStorageContext";
import ImageWithFallback from "../funcs/imgFallback";

function FilmInListComp({
  result,
  index,
  message = "Film was successfully added",
  button = <AddFilmButton film={result} />,
}) {
  const { setFilmInfo } = useFilmContext();
  const navigate = useNavigate();
  const movetodetails = () => {
    setFilmInfo(result);
    navigate(`/about/${result.id}`);
  };
  const [open, setOpen] = useState(false);

  const handleAddButtonClick = () => {
    setOpen(true);
  };

  return (
    <>
      <ReactSearchKit searchApi={searchApi}>
        <Item key={index} style={{ margin: "15px" }}>
          <Grid
            style={{ minWidth: "80vw", maxWidth: "80vw", minHeight: "25vh" }}
          >
            <Grid.Row
              role="button"
              tabIndex="0"
              onClick={movetodetails}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  movetodetails();
                }
              }}
            >
              <Grid.Column width={5}>
                <ImageWithFallback
                  src={result.poster}
                  fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                  alt={result.alt}
                  result={result}
                />
              </Grid.Column>

              <Grid.Column
                width={10}
                style={{ display: "flex", flexDirection: "column", gap: "3vh" }}
              >
                <Item>
                  <Item.Content>
                    <Item.Header
                      as="h2"
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {result.title}
                    </Item.Header>
                    <Item.Meta>
                      Description:{" "}
                      {result.plot.length > 100
                        ? result.plot.slice(0, 100) + " ..."
                        : result.plot}{" "}
                    </Item.Meta>
                    <Item.Description>
                      <Rating
                        icon="star"
                        defaultRating={result.imdbRating / 2}
                        maxRating={5}
                      />
                      <p> Genre: {result.genre.join(", ")}</p>
                      <p> {result.year} year</p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div
            role="button"
            tabIndex="0"
            onClick={handleAddButtonClick}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleAddButtonClick();
              }
            }}
          >
            {button}
          </div>
          <Divider />

          {open && (
            <NotifComp
              message={<p>{message}</p>}
              open={open}
              changeOpen={setOpen}
              button={<Okbth changeOpen={setOpen} />}
            />
          )}
        </Item>
      </ReactSearchKit>
    </>
  );
}

export default FilmInListComp;
