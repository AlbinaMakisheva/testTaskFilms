import PropTypes from "prop-types";
import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import AddFilmButton from "./AddFilmButton";
import AddNewFilm from "./AddNewFilm";
import {
  ActiveFilters,
  Count,
  Pagination,
  ResultsPerPage,
  Sort,
  ResultsList,
} from "react-searchkit";

export class ResultComp extends Component {
  constructor(props) {
    super(props);
    const { sortValues, resultsPerPageValues } = this.props;
    this.sortValues = sortValues;
    this.resultsPerPageValues = resultsPerPageValues;
  }

  render() {
    const { currentResultsState } = this.props;
    const { data } = currentResultsState;
    const { total } = data;

    return total ? (
      <div>
        <span style={{ padding: "5vw" }}>
          <ActiveFilters />
          <Sort
            values={this.sortValues}
            label={(cmp) => <> sorted by {cmp}</>}
          />
        </span>
        <Grid style={{ padding: "5vh" }}>
          <ResultsList button={<AddFilmButton />} />
          <div
            style={{
              position: "fixed",
              top: "90%",
              right: 0,
              transform: "translateY(-50%)",
            }}
          >
            <AddNewFilm />
          </div>
        </Grid>

        <div>
          <Grid relaxed verticalAlign="middle">
            <Grid.Column width={8}>
              <span style={{ paddingLeft: "10vw" }}>
                <Count label={(cmp) => <> Found {cmp} results</>} />
              </span>
            </Grid.Column>

            <Grid.Column width={8} textAlign="right">
              <span style={{ paddingRight: "10vw" }}>
                <ResultsPerPage
                  values={this.resultsPerPageValues}
                  label={(cmp) => <> Show {cmp} results per page</>}
                />
              </span>
            </Grid.Column>
          </Grid>

          <Grid centered textAlign="center" style={{ marginBottom: "5vh" }}>
            <Pagination />
          </Grid>
        </div>
      </div>
    ) : null;
  }
}

ResultComp.propTypes = {
  currentResultsState: PropTypes.object.isRequired,
  resultsPerPageValues: PropTypes.array.isRequired,
  sortValues: PropTypes.array.isRequired,
};

ResultComp.defaultProps = {};
