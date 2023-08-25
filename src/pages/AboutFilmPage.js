import React, {useState, useEffect} from "react";
import {MenuComp} from "../components/MenuComp";
import FilmDetailsComp from "../components/FilmDetailsComp";

import { useParams } from "react-router-dom";

function AboutFilmPage() {
  const film = window.localStorage.getItem("filminfo");
  const filmParsed = JSON.parse(film);

  const params = useParams();

  let filmData = filmParsed.id === parseInt(params.id);
  const [filmdb, setFilmdb] = useState(JSON.parse(window.localStorage.getItem('filmsdb')));

  useEffect(() => {
    localStorage.setItem("filmsdb", JSON.stringify(filmdb));
    JSON.parse(window.localStorage.getItem('filmsdb'))
  }, [filmdb]);

  const updateDetails=(newFilm, updatedFilmdb)=>{
    filmData= window.localStorage.setItem("filminfo", JSON.stringify(newFilm));
    window.localStorage.setItem("filmsdb", JSON.stringify(updatedFilmdb));
    console.log(newFilm)
    console.log(updatedFilmdb)
  }

  return filmData ? (
    <>
      <div>
        <MenuComp />
        <FilmDetailsComp film={filmParsed} updateDetails={updateDetails} filmdb={filmdb} setFilmdb={setFilmdb}/>
      </div>
    </>
  ) : null;
}

export default AboutFilmPage;
