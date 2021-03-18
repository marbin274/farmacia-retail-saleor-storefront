import classNames from "classnames";
import closeImg from "images/close.svg";
import searchImg from "images/search.svg";
import { stringify } from "query-string";
import * as React from "react";
import ReactSVG from "react-svg";
import { maybe } from "../../../core/utils";
import { DebouncedTextField } from "../../Debounce";
import { SearchResults } from "./gqlTypes/SearchResults";
import "./scss/index.scss";

interface SearchFormProps {
  autofocus?: boolean;
  handleSubmit?: (searchQs?: string) => void;
  handleInputBlur?: () => void;
  children: (
    search: string,
    hasSearchPhrase: boolean,
    hasResults: (data: SearchResults) => boolean
  ) => React.ReactNode;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  autofocus,
  handleInputBlur: inputBlur,
  handleSubmit: submit,
  children,
}) => {
  const [search, setSearch] = React.useState<string>("");
  const textFieldRef = React.useRef<HTMLInputElement>(null);
  const hasSearchPhrase = search.length >= 3;

  const hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (hasSearchPhrase && submit) {
      const searchQs = stringify({ q: search });
      submit(searchQs);
    }
  };
  const handleInputBlur = () => {
    if (!hasSearchPhrase && inputBlur) {
      inputBlur();
    }
  };

  const getFieldIcono = () => {
    if (hasSearchPhrase) {
      return (
        <ReactSVG
          path={closeImg}
          onClick={() => {
            setSearch("");
          }}
          className={"search__input--clear"}
        />
      );
    } else {
      return <ReactSVG path={searchImg} />;
    }
  };
  React.useEffect(() => {
    if (!search) {
      textFieldRef.current.value = "";
    }
  }, [search]);

  return (
    <form
      className={classNames("search", {
        "search--has-results": hasSearchPhrase,
      })}
      onClick={e => e.stopPropagation()}
      onSubmit={handleSubmit}
    >
      <div className="search__input">
        <DebouncedTextField
          inputRef={textFieldRef}
          onChange={({ target }) => setSearch(target.value)}
          value={search}
          innerIcon={getFieldIcono()}
          autoFocus={autofocus}
          placeholder="Busca por nombre"
          onBlur={handleInputBlur}
        />
      </div>
      {children(search, hasSearchPhrase, hasResults)}
    </form>
  );
};
