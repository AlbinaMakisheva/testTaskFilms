import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FilterComp } from "./FilterComp";
import { Menu, Grid, Sidebar, Button } from "semantic-ui-react";
import { SearchBar, withState } from "react-searchkit";
import { useFilmContext } from "../context/LocalStorageContext";
import * as colors from "../store/colors";

const Filter = withState(FilterComp);

function Overlay() {
  return (
    <div
      style={{
        position: "fixed",
        height: "110vh",
        width: "100%",
      }}
    />
  );
}

export const MenuComp = () => {
  const [visible, setVisible] = useState(false);

  const { activeItem, setActiveItem, favoriteFilms } = useFilmContext();

  function toggleVisibility() {
    setVisible(!visible);
  }

  const activeMenuItemStyle = {
    backgroundColor: colors.back,
    color: colors.base,
  };
  const inactiveMenuItemStyle = {
    backgroundColor: colors.base,
    color: "black",
  };

  function handleActive(e, { name }) {
    setActiveItem(name);
  }

  const colorSet = { backgroundColor: colors.back };

  return (
    <>
      <Grid centered style={colorSet}>
        <Grid.Row>
          {visible && <Overlay />}
          <Menu>
            <Button.Group basic size="big">
              <Menu.Item
                name="allFilms"
                active={activeItem === "allFilms"}
                onClick={handleActive}
                style={
                  activeItem === "allFilms"
                    ? activeMenuItemStyle
                    : inactiveMenuItemStyle
                }
              >
                <Link to="/">
                  <Button>All Films</Button>
                </Link>
              </Menu.Item>

              <Menu.Item
                name="addFilm"
                active={activeItem === "addFilm"}
                onClick={handleActive}
                style={
                  activeItem === "addFilm"
                    ? activeMenuItemStyle
                    : inactiveMenuItemStyle
                }
              >
                <Link to="/addfilm">
                  <Button>Add Film</Button>
                </Link>
              </Menu.Item>

              <Menu.Item
                name="myFilms"
                active={activeItem === "myFilms"}
                onClick={handleActive}
                style={
                  activeItem === "myFilms"
                    ? activeMenuItemStyle
                    : inactiveMenuItemStyle
                }
              >
                <Link to="/myfilms">
                  <Button>My Films ({favoriteFilms.length})</Button>
                </Link>
              </Menu.Item>
            </Button.Group>
          </Menu>
        </Grid.Row>
      </Grid>

      <Menu attached="top" style={colorSet}>
        <Button
          item
          icon="bars"
          basic
          onClick={toggleVisibility}
          aria-label="Toggle Menu"
        ></Button>
        <Menu.Menu position="right">
          <SearchBar />
        </Menu.Menu>
      </Menu>

      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="wide"
        height="100%"
      >
        <Menu.Item>
          <Filter func={() => setVisible(false)} />
        </Menu.Item>
      </Sidebar>
    </>
  );
};
