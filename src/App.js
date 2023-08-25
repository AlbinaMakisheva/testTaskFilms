import "./App.css";
import React, { useEffect } from "react";
import FilmList from "./pages/FilmList";
import AddFilmPage from "./pages/AddFilmPage";
import AboutFilmPage from "./pages/AboutFilmPage";
import MyFilmsPage from "./pages/MyFilmsPage";
import {
  Grid,
  Input,
  Icon,
  List,
  Checkbox,
  Label,
  Button,
} from "semantic-ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import filmsdb from "./filmsdb.json";
import searchApi from "./dbAPI";
import { OverridableContext } from "react-overridable";
import { ReactSearchKit } from "react-searchkit";
import FilmInListComp from "./components/FilmInListComp";

function App() {
  const FilmsListContainer = ({ results }) => {
    return <Grid style={{ padding: "5vh" }}>{results}</Grid>;
  };

  const MyBucketAggregationValues = ({
    bucket,
    onFilterClicked,
    isSelected,
    childAggCmps,
  }) => {
    return (
      <>
        <List.Item key={bucket.key}>
          <Checkbox
            style={{ float: "left" }}
            label={bucket.label}
            value={bucket.key}
            onClick={() => onFilterClicked(bucket.key)}
            checked={isSelected}
          />{" "}
          <Label>{bucket.doc_count}</Label>
          {bucket.key}
          {childAggCmps}
        </List.Item>
      </>
    );
  };

  const MyCount = ({ totalResults }) => {
    return (
      <Label style={{ backgroundColor: "#ffaaa5" }}>
        {totalResults.toLocaleString("en-US")}
      </Label>
    );
  };

  const MyBucketAggregationContainer = ({ valuesCmp }) => {
    return <List>{valuesCmp}</List>;
  };

  const CustomSearchBar = ({
    onBtnSearchClick,
    onInputChange,
    placeholder,
    uiProps,
    onKeyPress,
    queryString,
    ...actionProps
  }) => {
    const handleReset = () => {
      onInputChange("");
      onBtnSearchClick(); // need to click 2 times??
    };

    return (
      <div>
        <Input
          action={{
            content: "Search",
            onClick: onBtnSearchClick,
            ...actionProps,
          }}
          {...uiProps}
          placeholder={placeholder || "Type something"}
          onChange={(_, { value }) => {
            onInputChange(value);
          }}
          value={queryString}
          icon={
            <Button onClick={handleReset} style={{ backgroundColor: "white" }}>
              <Icon name="delete" />
            </Button>
          }
          onKeyPress={onKeyPress}
        ></Input>
      </div>
    );
  };

  useEffect(() => {
    window.localStorage.setItem("filmsdb", JSON.stringify(filmsdb));
  }, []);

  const overriddenComponents = {
    "ResultsList.item": FilmInListComp,
    "ResultsList.container": FilmsListContainer,
    "SearchBar.element": CustomSearchBar,
    "BucketAggregationValues.element": MyBucketAggregationValues,
    "BucketAggregationContainer.element": MyBucketAggregationContainer,
    "Count.element": MyCount,
  };

  const initialState = {
    sortBy: "title",
    sortOrder: "asc",
    layout: "list",
    page: 1,
    size: 5,
  };

  return (
    <>
      <OverridableContext.Provider value={overriddenComponents}>
        <ReactSearchKit searchApi={searchApi} initialQueryState={initialState}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FilmList />} />
              <Route path="/addfilm" element={<AddFilmPage />} />
              <Route path="/about/:id" element={<AboutFilmPage />} />
              <Route path="/myfilms" element={<MyFilmsPage />} />
            </Routes>
          </BrowserRouter>
        </ReactSearchKit>
      </OverridableContext.Provider>
    </>
  );
}

export default App;
