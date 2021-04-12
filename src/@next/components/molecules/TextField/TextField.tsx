import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

import { ErrorMessage, Input } from "@components/atoms";

export const TextField = React.forwardRef<HTMLInputElement, IProps>(({
  errors,
  helpText,
  ...rest
}: IProps, ref) => {
  const hasErrors = !!(errors && errors.length);
  return (
    <>
      <S.TextField>
        <Input {...rest} error={hasErrors} ref={ref}/>
        <S.ErrorMessages>
          <ErrorMessage errors={errors} />
          {helpText && <S.HelpText>{helpText}</S.HelpText>}
        </S.ErrorMessages>
      </S.TextField>
    </>
  );
});
