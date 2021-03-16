import { sanitize } from "dompurify";
import draftToHtml from "draftjs-to-html";
import React from "react";

import { IProps } from "./types";
import "./scss/index.scss";

export const RichTextContent: React.FC<IProps> = ({ descriptionJson }) => {
  return (
    <>
      {descriptionJson && (
        <div
          className="html_from_json"
          dangerouslySetInnerHTML={{
            __html: sanitize(draftToHtml(JSON.parse(descriptionJson))),
          }}
        />
      )}
    </>
  );
};
