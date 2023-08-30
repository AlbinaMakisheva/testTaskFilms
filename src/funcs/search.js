import _ from "lodash";
import React from "react";
import { Search, Grid } from "semantic-ui-react";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

const resultRenderer = ({ title }) => <p>{title}</p>;

function SearchFunc({ source, nameSearch, setVal }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();

  const handleSearchChange = React.useCallback(
    (e, data) => {
      clearTimeout(timeoutRef.current);
      dispatch({ type: "START_SEARCH", query: data.value });

      timeoutRef.current = setTimeout(() => {
        if (data.value.length === 0) {
          dispatch({ type: "CLEAN_QUERY" });
          return;
        }

        const re = new RegExp(_.escapeRegExp(data.value), "i");
        const isMatch = (result) => re.test(result?.label ?? result.title);

        const filteredResults = _.filter(source, isMatch);

        const createNewOption = {
          title: `Create New: ${data.value}`,
        };

        dispatch({
          type: "FINISH_SEARCH",

          results:
            filteredResults.length > 0
              ? filteredResults.map((result) => ({
                  title: result?.label ?? result.title,
                }))
              : [createNewOption],
        });
      }, 300);
    },
    [source]
  );

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Grid>
      <Grid.Column width={15}>
        <Search
          loading={loading}
          placeholder={`Search ${nameSearch}`}
          onResultSelect={(e, data) => {
            const selectedValue = data.result.title;
            if (selectedValue.startsWith("Create New:")) {
              const newTitle = selectedValue
                .replace("Create New:", "")
                .trim()
                .toLowerCase()
                .replace(/^\w/, (c) => c.toUpperCase());
              setVal(newTitle);
            } else {
              dispatch({
                type: "UPDATE_SELECTION",
                selection: selectedValue,
              });
              setVal(selectedValue);
            }
          }}
          onSearchChange={handleSearchChange}
          resultRenderer={resultRenderer}
          results={results}
          value={value}
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchFunc;
