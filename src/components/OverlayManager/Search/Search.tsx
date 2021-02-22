import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  Overlay,
  OverlayContextInterface
} from "../..";
import { SearchForm } from "./SearchForm";
import { SearchNetworkResult } from "./SearchNetworkResult";

interface SearchProps extends RouteComponentProps {
  overlay: OverlayContextInterface;
}

const Search = (props: SearchProps) => {

  const handleInputBlur = () => {
    props.overlay.hide();
  };
  return (
    <Overlay context={props.overlay} className="overlay--no-background">
      <SearchForm
        autofocus={true}
        handleInputBlur={handleInputBlur}
      >
        {(search, hasSearchPhrase, hasResults) => {
          return <SearchNetworkResult
            search={search}
            hasResults={hasResults}
            hasSearchPhrase={hasSearchPhrase}
          />
        }
        }
      </SearchForm>
    </Overlay>
  );
}

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
export default withRouter(
  (props: RouteComponentProps & { overlay: OverlayContextInterface }) => (
    <Search {...props} />
  )
);
