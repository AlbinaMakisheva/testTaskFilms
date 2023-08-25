import React from "react";
import { Grid, Header } from "semantic-ui-react";

import { ResultsLoader, Error, EmptyResults, withState } from "react-searchkit";

import { ResultComp } from "./ResultComp";

const OnResults = withState(ResultComp);

const FilmsListContainer = ({ results }) => {
  return (
    <Grid centered style={{ padding: "5vh", backgroundColor: "#fcf8f3" }}>
      {results}
    </Grid>
  );
};



const resultsPerPageValues = [
  {
    text: "5",
    value: 5,
  },
  {
    text: "10",
    value: 10,
  },
];

const sortValues = [
  {
    text: "Newest",
    sortBy: "year",
    sortOrder: "desc",
  },
  {
    text: "Oldest",
    sortBy: "year",
    sortOrder: "asc",
  },
  {
    text: "Alphabetic",
    sortBy: "title",
    sortOrder: "asc",
  },
];

FilmsListContainer.defaultProps = {
  overridableId: "",
};

function FilmsListComp() {
  return (
    <>
      <Header as="h1" textAlign="center">
        Explore films
      </Header>

      <Grid style={{ padding: "5vh", backgroundColor: "#fcf8f3" }}>
        <ResultsLoader>
          <Error />
          <EmptyResults />
          <OnResults
            resultsPerPageValues={resultsPerPageValues}
            sortValues={sortValues}
          />
        </ResultsLoader>
      </Grid>
    </>
  );
}

export default FilmsListComp;
