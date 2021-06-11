import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Overlay, OverlayContextInterface } from "../..";
import { searchUrl } from "../../../app/routes";
import { SearchForm } from "./SearchForm";
import { SearchOverlayTitle } from "./SearchOverlayTitle";

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
    <Overlay context={props.overlay}>
      <div className="search-container">
        <SearchOverlayTitle overlayContext={props.overlay} />
        <SearchForm
          autofocus={true}
          handleInputBlur={handleInputBlur}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="search-message">
        <p>“No se encontraron resultados”</p>
        <p>
          Escribe el nombre del producto
          <br /> que estas buscando
        </p>
      </div>
    </Overlay>
  );
};

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
export default withRouter(
  (props: RouteComponentProps & { overlay: OverlayContextInterface }) => (
    <Search {...props} />
  )
);
