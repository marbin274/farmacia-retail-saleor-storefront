import "./scss/index.scss";

import classNames from "classnames";
import { stringify } from "query-string";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import ReactSVG from "react-svg";
import {
  Loader,
  OfflinePlaceholder,
  Overlay,
  OverlayContextInterface,
  OverlayType,
} from "../..";
import { searchUrl } from "../../../app/routes";
import { maybe } from "../../../core/utils";
import { DebouncedTextField } from "../../Debounce";
import { Error } from "../../Error";
import NetworkStatus from "../../NetworkStatus";
import { SearchResults } from "./gqlTypes/SearchResults";
import NothingFound from "./NothingFound";
import ProductItem from "./ProductItem";
import { TypedSearchResults } from "./queries";
import searchImg from "../../../images/search.svg";

interface SearchProps extends RouteComponentProps {
  overlay: OverlayContextInterface;
}

interface SearchState {
  search: string;
  inputFocused: boolean;
}

class Search extends React.Component<SearchProps, SearchState> {
  state = { search: "", inputFocused: false };
  submitBtnRef = React.createRef<HTMLButtonElement>();

  get hasSearchPhrase() {
    return this.state.search.length >= 3;
  }

  get redirectTo() {
    return { pathname: searchUrl, search: `?${this.searchQs}` };
  }

  get searchQs() {
    return stringify({ q: this.state.search });
  }

  hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  handleSubmit = (evt: React.FormEvent) => {
    if (this.hasSearchPhrase && this.submitBtnRef.current) {
      this.props.overlay.hide();
      this.props.history.push(`${searchUrl}?${this.searchQs}`);
    }

    evt.preventDefault();
  };
  
  handleInputBlur = () => {
    if (!this.hasSearchPhrase) {
      this.props.overlay.hide();
    }
  };

  componentDidUpdate(_prevProps: SearchProps, prevState: SearchState) {
    if (
      !!prevState.search.length &&
      this.props.overlay.type !== OverlayType.search
    ) {
      this.setState({ search: "" });
    }
  }

  render() {
    return (
      <Overlay context={this.props.overlay} className="overlay--no-background">
        <form
          className={classNames("search", {
            "search--has-results": this.hasSearchPhrase,
          })}
          onClick={e => e.stopPropagation()}
          onSubmit={this.handleSubmit}
        >
          <div className="search__input">
            <DebouncedTextField
              onChange={({ target }) => this.setState({ search: target.value })}
              value={this.state.search}
              innerIcon={<ReactSVG path={searchImg} />}
              autoFocus={true}
              placeholder="Busca por nombre o síntoma"
              onBlur={this.handleInputBlur}
            />
          </div>
          <div
            className={classNames(
              "search__products",
              "search__products--expanded",
              {
                "search__products--background-opacity": !this.hasSearchPhrase,
              }
            )}
          >
            <NetworkStatus>
              {isOnline => {
                if (this.hasSearchPhrase) {
                  return (
                    <TypedSearchResults
                      renderOnError
                      displayError={false}
                      errorPolicy="all"
                      variables={{ query: this.state.search }}
                    >
                      {({ data, error, loading }) => {
                        if (this.hasResults(data)) {
                          return (
                            <>
                                <div className="search__products__results">
                                {loading ? (
                                  <Loader />
                                ) : (
                                  <p>
                                    {data.products.edges.length} resultados para <span>"{this.state.search}"</span>
                                  </p>
                                )}
                              </div>
                              <ul>
                                {data.products.edges.map(product => (
                                  <ProductItem
                                    {...product}
                                    key={product.node.id}
                                  />
                                ))}                                
                              </ul>
                            </>
                          );
                        }

                        if (error) {
                          return isOnline ? (
                            <Error error={error.message} />
                          ) : (
                            <OfflinePlaceholder />
                          );
                        }

                        return <NothingFound search={this.state.search} />;
                      }}
                    </TypedSearchResults>
                  );
                }
                return null;
              }}
            </NetworkStatus>
          </div>
        </form>
      </Overlay>
    );
  }
}

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
export default withRouter(
  (props: RouteComponentProps & { overlay: OverlayContextInterface }) => (
    <Search {...props} />
  )
);
