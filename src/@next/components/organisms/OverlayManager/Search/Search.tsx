import {
  Overlay,
  OverlayContextInterface,
} from '@components/organisms/OverlayComponent';
import { useRouter } from 'next/router';
import * as React from 'react';
import { searchUrl } from '../../../../../app/routes';
import { SearchForm } from './components/SearchForm';
import { SearchOverlayTitle } from './components/SearchOverlayTitle';
import { SearchMessage } from './styles';
interface SearchProps {
  overlay: OverlayContextInterface;
}

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const router = useRouter();
  const handleSubmit = (searchQs: string) => {
    props.overlay.hide();
    router.push(`${searchUrl}?${searchQs}`);
  };

  const handleInputBlur = () => {
    props.overlay.hide();
  };
  return (
    <Overlay context={props.overlay}>
      <div className="search-container fa-flex fa-flex-col fa-items-center fa-bg-highlight-darkest fa-p-4 fa-w-full">
        <SearchOverlayTitle overlayContext={props.overlay} />
        <SearchForm
          autofocus={true}
          handleInputBlur={handleInputBlur}
          handleSubmit={handleSubmit}
        />
      </div>
      <SearchMessage className="fa-w-full">
        <p className="fa-text-center fa-text-neutral-dark fa-my-4 fa-mx-0">
          “No se encontraron resultados”
        </p>
        <p className="fa-text-center fa-text-neutral-medium">
          Escribe el nombre del producto
          <br /> que estas buscando
        </p>
      </SearchMessage>
    </Overlay>
  );
};

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
export default Search;
