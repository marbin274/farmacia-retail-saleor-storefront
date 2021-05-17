import * as React from "react";
import { Helmet } from "react-helmet";

import { Consumer as MetaConsumer } from "./context";

const Consumer: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <MetaConsumer>
    {({ title, description, image, type, url, custom }) => {
      const pathname: string = document.location.pathname?.includes("search") ? "/" : document.location.pathname;
      const canonicalURL: string = `${document.location.protocol}//${document.location.hostname}${pathname}`;      
      return <>
        <Helmet
          title={title}
          link={[
            {
              href: canonicalURL,
              rel: "canonical",
            },
          ]}
          meta={[
            { name: "description", content: description },
            { property: "og:url", content: url },
            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:type", content: type },
            { property: "og:image", content: image },
            ...custom,
          ]}
        />
        {children}
      </>
    }}
  </MetaConsumer>
);

export default Consumer;
