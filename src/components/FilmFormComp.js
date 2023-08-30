import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import NotifComp from "./NotifComp";
import Okbth from "./OkBth";
import SearchFunc from "../funcs/search";
import * as colors from "../store/colors";

export function FilmFormComp({
  film,
  currentResultsState,
  filmdb,
  setFilmdb,
  updateDetails,
}) {
  const { data } = currentResultsState;
  const { aggregations } = data;

  const genreAggr = aggregations?.genre?.buckets || [];
  const yearAggr = aggregations?.year?.buckets || [];

  const [openOk, setOpenOk] = useState(false);
  const [inputErr, setInputErr] = useState(false);
  const [agree, setAgree] = useState(false);

  const [filmName, setFilmName] = useState(film?.title ?? "");
  const [filmGenre, setFilmGenre] = useState(film?.genre ?? "");
  const [filmYear, setFilmYear] = useState(film?.year ?? "");
  const [filmDesc, setFilmDesc] = useState(film?.plot ?? "");
  const [filmImg, setFilmImg] = useState(film?.poster ?? "");
  const [filmImgImg, setFilmImgImg] = useState(film?.image ?? "");

  const formStyle = {
    padding: "3vw 5vw",
    border: "solid lightgray 1px",
    maxWidth: "70vh",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const handleSubmit = () => {
    if (
      !filmYear ||
      !filmGenre ||
      !filmName ||
      !agree ||
      !/^\d{4}$/.test(filmYear) ||
      !/^[A-Za-z]+$/.test(filmGenre)
    ) {
      setInputErr(true);
      return;
    }

    const filmId =
      film?.id !== undefined ? film?.id : Math.floor(Math.random() * 1000) + 10;

    const newFilm = {
      id: filmId,
      title: filmName,
      genre: filmGenre,
      year: filmYear,
      plot: filmDesc,
      poster: filmImg,
      image: filmImgImg,
    };

    const existingFilmIndex = filmdb.findIndex(
      (filmindb) => filmindb.id === filmId
    );

    if (existingFilmIndex !== -1) {
      const updatedFilmdb = [...filmdb];
      updatedFilmdb[existingFilmIndex] = newFilm;
      updateDetails(newFilm, updatedFilmdb);
    } else {
      const dbWithNewData = [...filmdb, newFilm];
      setFilmdb(dbWithNewData);
    }
    setOpenOk(true);
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setFilmImgImg(reader.result);
    };
    reader.readAsDataURL(image);
  };

  return (
    <>
      <Form style={formStyle} onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Film name"
            value={filmName}
            aria-label="Film Name"
            aria-invalid={inputErr && !filmName}
            required
            onChange={(e) => {
              setFilmName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input>
            <SearchFunc
              source={yearAggr}
              nameSearch="year"
              required
              setVal={setFilmYear}
            />
          </Form.Input>

          <Form.Input>
            <SearchFunc
              source={genreAggr}
              nameSearch="genre"
              required
              setVal={setFilmGenre}
            />
          </Form.Input>
        </Form.Group>

        <Form.Field>
          <Form.TextArea
            label="Description"
            placeholder="Write interesting description of the film so we could take into account your application!"
            value={filmDesc}
            aria-label="Film Description"
            aria-invalid={inputErr && !filmDesc}
            required
            onChange={(e) => {
              setFilmDesc(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Group>
          <Form.Field>
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
            />
            <input
              type="text"
              value={filmImg}
              placeholder="url link"
              onChange={(e) => setFilmImg(e.target.value)}
            />
          </Form.Field>
        </Form.Group>

        <Form.Checkbox
          label="I agree to the Terms and Conditions"
          required
          onChange={() => setAgree(!agree)}
        />
        <Form.Button
          style={{
            margin: "20px",
            backgroundColor: colors.green,
            color: colors.base,
          }}
        >
          Submit
        </Form.Button>
      </Form>

      {openOk && (
        <NotifComp
          message={<p>Film was successfully uploaded</p>}
          open={openOk}
          changeOpen={setOpenOk}
          button={<Okbth changeOpen={setOpenOk} size="mini" />}
        />
      )}
      {inputErr && (
        <NotifComp
          message={
            <p>
              Fill all required fields (name, genre, year, description,
              agreement) in the correct version{" "}
            </p>
          }
          open={inputErr}
          changeOpen={setInputErr}
          button={<Okbth changeOpen={setInputErr} size="mini" />}
        />
      )}
      {console.log(inputErr)}
    </>
  );
}
