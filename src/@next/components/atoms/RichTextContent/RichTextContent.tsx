import { sanitize } from "dompurify";
import draftToHtml from "draftjs-to-html";
import React from "react";
import classNames from "classnames";

import { IProps } from "./types";
import "./scss/index.scss";

export const RichTextContent: React.FC<IProps> = ({
  className,
  descriptionJson,
}) => {
  return (
    <>
      {descriptionJson && (
        <div
          className={classNames("html_from_json", className)}
          dangerouslySetInnerHTML={{
            __html: sanitize(draftToHtml(JSON.parse(descriptionJson))),
          }}
        />
      )}
    </>
  );
};
