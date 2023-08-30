import React from "react";
import { MenuComp } from "../components/MenuComp";
import { FilmFormComp } from "../components/FilmFormComp";
import { Header } from "semantic-ui-react";
import { withState } from "react-searchkit";
import { useFilmContext } from "../context/LocalStorageContext";

const FilmForm = withState(FilmFormComp);

function AddFilmPage() {
  const { filmsdb, setFilmsdb } = useFilmContext();

  return (
    <>
      <div>
        <MenuComp />
        <Header textAlign="center" style={{ paddingBottom: "10px" }}>
          Application form
        </Header>

        <FilmForm setFilmdb={setFilmsdb} filmdb={filmsdb} />
      </div>
    </>
  );
}

export default AddFilmPage;
