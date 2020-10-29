import * as React from "react";

export const NothingFound: React.FC<{ search: string }> = ({ search }) => (
  <div className="search__products--not-found">
    <p>
      Lo sentimos, pero no pudimos encontrar ningún resultado de búsqueda para:{" "}
      {search}
    </p>
  </div>
);

export default NothingFound;
