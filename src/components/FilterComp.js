import React from "react";
import { Header, Button, Form } from "semantic-ui-react";
import { BucketAggregation } from "react-searchkit";
import { Link } from "react-router-dom";
import * as colors from "../store/colors";

export function FilterComp({ func }) {
  const genresAggregation = {
    title: "Genres",
    agg: {
      field: "genre",
      aggName: "genre",
      childAgg: {
        field: "year",
        aggName: "year",
      },
    },
  };

  const yearsAggregation = {
    title: "Years",
    agg: {
      field: "year",
      aggName: "year",
    },
  };

  return (
    <>
      <Header as="h2" style={{ marginTop: "3vh", color: colors.base }}>
        Filter
      </Header>
      <Form style={{ marginBottom: "3vh" }}>
        <BucketAggregation
          title={genresAggregation.title}
          agg={genresAggregation.agg}
        />

        <BucketAggregation
          title={yearsAggregation.title}
          agg={yearsAggregation.agg}
        />
      </Form>

      <Link to="/">
        <Button onClick={func}>Ok</Button>
      </Link>
    </>
  );
}
