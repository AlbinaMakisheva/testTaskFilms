import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating, Item, Grid, Image, Divider } from "semantic-ui-react";
import { ReactSearchKit } from "react-searchkit";
import searchApi from ".././dbAPI";
import AddFilmButton from "./AddFilmButton";
import NotifComp from "./NotifComp";
import Okbth from "./OkBth";

function ImageWithFallback({ src, fallbackSrc, alt, result }) {
  const [imageSrc, setImageSrc] = React.useState(src);

  const handleImageError = () => {
    setImageSrc(fallbackSrc);
  };

  return result?.image ? (
    <Image
      src={result.image}
      onError={handleImageError}
      alt={alt}
      margin="5vw"
    />
  ) : (
    <Image src={imageSrc} onError={handleImageError} alt={alt} margin="5vw" />
  );
}

function FilmInListComp({
  result,
  index,
  message = "Film was successfully added",
  button = <AddFilmButton film={result} />,
}) {
  const navigate = useNavigate();
  const movetodetails = () => {
    window.localStorage.setItem("filminfo", JSON.stringify(result));
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
            width={15}
            height={13}
            style={{ minWidth: "80vw", maxWidth: "80vw" }}
          >
            <Grid.Row onClick={movetodetails}>
              <Grid.Column width={5}>
                <ImageWithFallback
                  src={result.poster}
                  fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                  alt={result.alt}
                  result={result}
                />
              </Grid.Column>

              <Grid.Column width={10}>
                <Item style={{ margin: "2vw" }}>
                  <Item.Content>
                    <Item.Header
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        margin: "1rem 0rem 1rem",
                      }}
                    >
                      {result.title}
                    </Item.Header>
                    <Item.Meta>Description: {result.plot} </Item.Meta>
                    <Item.Description>
                      <Rating
                        icon="star"
                        defaultRating={result.imdbRating}
                        maxRating={10}
                      />
                      <p> Genre: {result.genre}</p>
                      <p> {result.year} year</p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div onClick={handleAddButtonClick}>{button}</div>
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
