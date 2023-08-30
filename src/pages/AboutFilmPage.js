import React from "react";
import { MenuComp } from "../components/MenuComp";
import FilmDetailsComp from "../components/FilmDetailsComp";
import { useFilmContext } from "../context/LocalStorageContext";
import { useParams } from "react-router-dom";

function AboutFilmPage() {
  const { filmInfo, updateDetails, filmsdb, setFilmsdb } = useFilmContext();
  const params = useParams();

  let filmData = filmInfo.id === parseInt(params.id);

  return filmData ? (
    <>
      <div>
        <MenuComp />
        <FilmDetailsComp
          film={filmInfo}
          updateDetails={updateDetails}
          filmdb={filmsdb}
          setFilmdb={setFilmsdb}
        />
      </div>
    </>
  ) : null;
}

export default AboutFilmPage;
