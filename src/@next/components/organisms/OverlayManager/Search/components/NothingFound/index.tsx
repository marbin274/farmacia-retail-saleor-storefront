import * as React from 'react';
import { NotFoundMessage } from './styles';

export const NothingFound: React.FC<{ search: string }> = ({ search }) => (
  <NotFoundMessage className="fa-my-0 fa-mx-auto fa-w-full fa-p-3.5">
    <p className="fa-text-center fa-text-neutral-dark">
      “No se encontraron resultados”
    </p>
    <br />
    <p className="fa-text-center fa-text-neutral-dark">
      Lo sentimos, pero no pudimos encontrar ningún resultado de búsqueda para:{' '}
    </p>
    <div className="fa-text-center fa-p-4">
      <p className="fa-font-semibold">{search}</p>
    </div>
  </NotFoundMessage>
);

export default NothingFound;
