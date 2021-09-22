import { SearchIcon, XIcon } from '@farmacia-retail/farmauna-components';
import { DebouncedTextField } from '@temp/@next/components/molecules/Debounce';
import { searchProductsService } from '@temp/@next/services/searchProductsService';
import { launchSearchEvent } from '@temp/@sdk/gaConfig';
import { searchUrl } from '@temp/app/routes';
import { SEARCH_PRODUCTS_QUERY_MIN_LENGTH } from '@temp/core/config';
import { useRouter } from 'next/router';
import { stringify } from 'query-string';
import * as React from 'react';
import { InputWrapper } from './styles';

interface SearchFormProps {
  autofocus?: boolean;
  handleSubmit?: (searchQs?: string) => void;
  handleInputBlur?: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = React.memo(
  ({ autofocus, handleInputBlur: inputBlur, handleSubmit: submit }) => {
    const [search, setSearch] = React.useState<string>('');
    const textFieldRef = React.useRef<HTMLInputElement>(null);

    const router = useRouter();

    const hasSearchPhrase = search.length >= SEARCH_PRODUCTS_QUERY_MIN_LENGTH;

    const handleSubmit = (evt: React.FormEvent) => {
      evt.preventDefault();
      if (hasSearchPhrase) {
        const searchQs = stringify({ q: search });
        searchProductsService.hide();
        router.push(`${searchUrl}?${searchQs}`);
        submit?.(searchQs);
      }
    };
    const handleInputBlur = () => {
      if (!hasSearchPhrase && inputBlur) {
        inputBlur();
      }
    };

    const getFieldIcono = () => {
      if (hasSearchPhrase)
        return (
          <div
            onClick={() => {
              clearSearch();
            }}
            className="fa-m-auto fa-cursor-pointer fa-transform fa-translate-y-px fa-translate-x-px"
          >
            <XIcon size={16} />
          </div>
        );

      return <SearchIcon size={16} />;
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
        className="fa-w-full lg:fa-w-auto"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <InputWrapper className="search__input">
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
        </InputWrapper>
      </form>
    );
  }
);
