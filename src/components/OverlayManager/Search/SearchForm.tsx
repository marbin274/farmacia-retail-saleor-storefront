import { searchProductsService } from '@temp/@next/services/searchProductsService';
import { launchSearchEvent } from '@temp/@sdk/gaConfig';
import { searchUrl } from '@temp/app/routes';
import { SEARCH_PRODUCTS_QUERY_MIN_LENGTH } from '@temp/core/config';
import classNames from 'classnames';
import { SearchIcon, XIcon } from '@farmacia-retail/farmauna-components';
import { stringify } from 'query-string';
import * as React from 'react';
import { useHistory } from 'react-router';
import { DebouncedTextField } from '../../Debounce';
import './scss/index.scss';

interface SearchFormProps {
  autofocus?: boolean;
  handleSubmit?: (searchQs?: string) => void;
  handleInputBlur?: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = React.memo(
  ({ autofocus, handleInputBlur: inputBlur, handleSubmit: submit }) => {
    const [search, setSearch] = React.useState<string>('');
    const textFieldRef = React.useRef<HTMLInputElement>(null);

    const history = useHistory();

    const hasSearchPhrase = search.length >= SEARCH_PRODUCTS_QUERY_MIN_LENGTH;

    const handleSubmit = (evt: React.FormEvent) => {
      evt.preventDefault();
      if (hasSearchPhrase) {
        const searchQs = stringify({ q: search });
        searchProductsService.hide();
        history.push(`${searchUrl}?${searchQs}`);
        submit?.(searchQs);
      }
    };
    const handleInputBlur = () => {
      if (!hasSearchPhrase && inputBlur) {
        inputBlur();
      }
    };

    const getFieldIcono = () => {
      return hasSearchPhrase ? (
        <div
          onClick={() => {
            clearSearch();
          }}
          className={'search__input--clear'}
        >
          <XIcon size={16} />
        </div>
      ) : (
        <SearchIcon size={16} />
      );
    };

    const clearSearch = () => {
      searchProductsService.hide();
    };

    React.useEffect(() => {
      const suscription = searchProductsService
        .on()
        .subscribe((payload: string) => {
          if (!payload) {
            setSearch('');
          }
        });

      const delayDebounceFn = setTimeout(() => {
        if (search.length > 0) {
          launchSearchEvent(search);
        }
      }, 1000);

      return () => {
        suscription.unsubscribe();
        clearTimeout(delayDebounceFn);
      };
    }, [search]);

    const handleDebounce = (nextvalue: any) => {
      searchProductsService.setSearch(nextvalue);
    };

    return (
      <form
        className={classNames('search', {
          'search--has-results': hasSearchPhrase,
        })}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="search__input">
          <DebouncedTextField
            inputRef={textFieldRef}
            value={search}
            innerIcon={getFieldIcono()}
            autoFocus={autofocus}
            placeholder="Busca por nombre o marca"
            onChange={({ target }) => setSearch(target.value)}
            onBlur={handleInputBlur}
            handleDebounce={handleDebounce}
          />
        </div>
      </form>
    );
  }
);
