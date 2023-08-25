import React, {useEffect, useState} from "react";
import {MenuComp} from "../components/MenuComp";
import {FilmFormComp} from "../components/FilmFormComp";
import { Header } from "semantic-ui-react";
import {withState} from 'react-searchkit'

const FilmForm= withState(FilmFormComp)
function AddFilmPage() {


  const [filmdb, setFilmdb] = useState(JSON.parse(localStorage.getItem('filmsdb')));

  useEffect(() => {
    localStorage.setItem("filmsdb", JSON.stringify(filmdb));
    JSON.parse(window.localStorage.getItem('filmsdb'))
  }, [filmdb]);


  return (
    <>
      <div>
        <MenuComp />
        <Header textAlign="center">Application form</Header>
        <FilmForm setFilmdb={setFilmdb} filmdb={filmdb}/>
      </div>
    </>
  );
}

export default AddFilmPage;
