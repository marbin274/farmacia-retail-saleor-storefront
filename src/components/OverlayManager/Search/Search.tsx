import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  Overlay,
  OverlayContextInterface
} from "../..";
import { searchUrl } from "../../../app/routes";
import { SearchForm } from "./SearchForm";
import { SearchNetworkResult } from "./SearchNetworkResult";

interface SearchProps extends RouteComponentProps {
  overlay: OverlayContextInterface;
}

const Search = (props: SearchProps) => {

  const handleSubmit = (searchQs: string) => {
    props.overlay.hide();
    props.history.push(`${searchUrl}?${searchQs}`);
  };

  const handleInputBlur = () => {
    props.overlay.hide();
  };
  return (
    <Overlay context={props.overlay} className="overlay--no-background">
      <SearchForm
        handleInputBlur={handleInputBlur}
        handleSubmit={handleSubmit}
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
