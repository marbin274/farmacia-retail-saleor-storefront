import { sanitize } from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import classNames from 'classnames';

import { IProps } from './types';
import * as S from './styles';

export const RichTextContent: React.FC<IProps> = ({
  className,
  descriptionJson,
}) => {
  return (
    <>
      {descriptionJson && (
        <S.Wrapper
          className={classNames('fa-text-gray-dark', className)}
          dangerouslySetInnerHTML={{
            __html: sanitize(draftToHtml(JSON.parse(descriptionJson))),
          }}
        />
      )}
    </>
  );
};
