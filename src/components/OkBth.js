import React from "react";
import { Button } from "semantic-ui-react";
import * as colors from "../store/colors";

function Okbth({ changeOpen }) {
  return (
    <Button
      content="OK"
      labelPosition="right"
      icon="checkmark"
      onClick={() => changeOpen(false)}
      style={{ backgroundColor: colors.green, color: colors.base }}
      aria-label="OK Button"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          changeOpen(false);
        }
      }}
      tabIndex="0"
    />
  );
}

export default Okbth;
