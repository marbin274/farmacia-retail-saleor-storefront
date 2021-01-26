import { CHECKOUT_STEPS } from "@temp/core/config";
import React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import * as S from "./styles";
import { IProps, IStep } from "./types";

export enum DOT_STATUS {
  INACTIVE,
  ACTIVE,
  DONE,
}

const drawDot = (step: IStep, status: DOT_STATUS) => (
  <S.Dot status={status}>
    <ReactSVG
      path={S.ICONS[step.index]}
      style={S.flexCentered}
      svgStyle={{ fill: S.ICON_COLORS[status], stroke: S.ICON_COLORS[status] }}
    />
  </S.Dot>
);

const generateDot = (
  step: IStep,
  currentActiveStep: number,
  isLastStep = false
) => {
  if (
    isLastStep &&
    step.index < CHECKOUT_STEPS[CHECKOUT_STEPS.length - 1].index
  ) {
    return drawDot(step, DOT_STATUS.INACTIVE);
  }
  if (step.index < currentActiveStep) {
    return drawDot(step, DOT_STATUS.DONE);
  } else if (step.index === currentActiveStep) {
    return drawDot(step, DOT_STATUS.ACTIVE);
  } else if (step.index > currentActiveStep) {
    return drawDot(step, DOT_STATUS.INACTIVE);
  }
};

const generateProgressBar = (
  index: number,
  currentActive: number,
  numberOfSteps: number,
  isLastStep = false
) => {
  if (index !== numberOfSteps - 1) {
    return isLastStep ? (
      <S.ProgressBar done={false} />
    ) : (
      <S.ProgressBar done={currentActive > index} />
    );
  }
};

const generateSteps = (
  steps: IStep[],
  currentActive: number,
  existRequestPayload: boolean
) => {
  return steps?.map(step => {
    return (
      <S.Step key={step.index}>
        {existRequestPayload ? (
          <span>{generateDot(step, currentActive, true)}</span>
        ) : (
          <Link to={step.link}>{generateDot(step, currentActive)}</Link>
        )}
        {generateProgressBar(
          step.index,
          currentActive,
          steps.length,
          existRequestPayload
        )}
      </S.Step>
    );
  });
};

/**
 * Progress bar showing current step of checkout process.
 */
const CheckoutProgressBar: React.FC<IProps> = ({
  steps,
  activeStepIndex,
  requestPayload,
  currentRoutePath,
}: IProps) => {
  const activeStep = steps.find(st => st.index === activeStepIndex);

  const disableSteps =
    currentRoutePath === CHECKOUT_STEPS[2].link && requestPayload !== null;

  return (
    <div>
      <S.Wrapper>
        {generateSteps(steps, activeStepIndex, disableSteps)}
      </S.Wrapper>
      {activeStep && <S.Label>{activeStep.name}</S.Label>}
    </div>
  );
};

export { CheckoutProgressBar };
