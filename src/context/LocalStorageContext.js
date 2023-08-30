import React, { createContext, useContext } from "react";
import useLocalStorage from "../funcs/useLocalStorage";

const FilmContext = createContext();

export function FilmProvider({ children }) {
  const [filmsdb, setFilmsdb] = useLocalStorage(
    "filmsdb",
    JSON.parse(localStorage.getItem("filmsdb")) ?? []
  );

  const [favoriteFilms, setFavoriteFilms] = useLocalStorage(
    "favoriteFilms",
    JSON.parse(localStorage.getItem("favoriteFilms")) ?? []
  );

  const [filmInfo, setFilmInfo] = useLocalStorage(
    "filminfo",
    JSON.parse(localStorage.getItem("filminfo")) ?? []
  );

  const [activeItem, setActiveItem] = useLocalStorage(
    "activemenu",
    JSON.parse(window.localStorage.getItem("activemenu")) ?? ""
  );

  const addFavfilm = (film, setShowNotif, setShowAlert) => {
    let favfilms = favoriteFilms;
    if (!favoriteFilms.some((existingFilm) => existingFilm.id === film.id)) {
      favfilms.push(film);
      setFavoriteFilms(favfilms);
      window.localStorage.setItem(
        "favoriteFilms",
        JSON.stringify(favoriteFilms)
      );
      setShowNotif(true);
      setTimeout(() => {
        setShowNotif(false);
      }, 1000);
    } else {
      setShowAlert(true);
    }
  };

  const deletefavfilm = (film) => {
    const newfavfilms = favoriteFilms.filter(
      (delfilm) => delfilm.id !== film.id
    );
    setFavoriteFilms(newfavfilms);
    setTimeout(() => {
      window.location.reload(true);
    }, 1500);
  };

  const updateDetails = (newFilm, updatedFilmdb) => {
    setFilmInfo(newFilm);
    setFilmsdb(updatedFilmdb);
    window.location.reload(true);
  };

  return (
    <FilmContext.Provider
      value={{
        favoriteFilms,
        filmsdb,
        setFilmsdb,
        addFavfilm,
        deletefavfilm,
        filmInfo,
        setFilmInfo,
        activeItem,
        setActiveItem,
        updateDetails,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
}

export function useFilmContext() {
  return useContext(FilmContext);
}
