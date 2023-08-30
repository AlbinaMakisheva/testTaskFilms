import React from "react";
import { MenuComp } from "../components/MenuComp";
import FilmsListComp from "../components/FilmsListComp";
import { withState } from "react-searchkit";

const Menu = withState(MenuComp);

function FilmList() {
  return (
    <>
      <Menu />
      <FilmsListComp />
    </>
  );
}

export default FilmList;
