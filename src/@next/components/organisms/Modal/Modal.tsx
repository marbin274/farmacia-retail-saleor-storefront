import { CardHeader, FormFooter } from "@components/molecules";
import { Overlay } from "@components/organisms";
import React from "react";
import "./scss/index.scss";
import * as S from "./styles";
import { IProps } from "./types";

const getCancelBtnProps = (action: () => void, text?: string) =>
  text && {
    cancelBtn: {
      action,
      text,
    },
  };

const getSubmitBtnProps = (text: string, action?: () => void) => ({
  submitBtn: action
    ? {
        action,
        text,
      }
    : { text },
});

export const Modal: React.FC<IProps> = ({
  cancelBtnText,
  children,
  contentClassName,
  disabled,
  hide,
  formId = "modal-submit",
  onSubmit,
  submitBtnText,
  show,
  target,
  title,
}: IProps) => {
  return (
    <Overlay position="center" show={show} target={target}>
      <div className="fa-h-screen lg:fa-p-12 fa-w-full fa-flex fa-items-center">
        <S.Modal>
          <CardHeader onHide={hide}>{title}</CardHeader>
          <S.Content className={contentClassName}>{children}</S.Content>
          {submitBtnText && (
            <FormFooter
              divider
              disabled={disabled}
              {...getSubmitBtnProps(submitBtnText, onSubmit)}
              {...getCancelBtnProps(hide, cancelBtnText)}
              formId={formId}
            />
          )}
        </S.Modal>
      </div>
    </Overlay>
  );
};
