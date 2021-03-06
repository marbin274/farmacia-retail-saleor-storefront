import { BackIcon, CheckIcon } from '@farmacia-retail/farmauna-components';
import { LocalRepository } from '@temp/@sdk/repository';
import Link from 'next/link';
import React from 'react';
import * as S from './styles';
import { IProps, IStep } from './types';

export enum DOT_STATUS {
  INACTIVE,
  ACTIVE,
  DONE,
}

const drawDot = (step: IStep, status: DOT_STATUS) => (
  <S.Dot status={status}>
    {status === DOT_STATUS.DONE ? (
      <CheckIcon size={12} color="white" />
    ) : (
      <span>{step.index + 1}</span>
    )}
    <S.DotStatus status={status}>{step.name}</S.DotStatus>
  </S.Dot>
);

const generateDot = (step: IStep, currentActiveStep: number) => {
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
  currentPath: string
) => {
  const localRepository = new LocalRepository();
  if (index !== numberOfSteps - 1) {
    return localRepository.getPurchase() &&
      currentPath === '/order-finalized' ? (
      <S.ProgressBar done={true} />
    ) : (
      <S.ProgressBar done={currentActive > index} />
    );
  }
};

const generateSteps = (
  steps: IStep[],
  currentActive: number,
  currentPath: string
) => {
  const localRepository = new LocalRepository();
  return steps?.map((step) => {
    return (
      <S.Step key={step.index}>
        {localRepository.getPurchase() && currentPath === '/order-finalized' ? (
          <span>{generateDot(step, currentActive)}</span>
        ) : (
          <Link href={step.link}>{generateDot(step, currentActive)}</Link>
        )}
        {generateProgressBar(
          step.index,
          currentActive,
          steps.length,
          currentPath
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
  pathName,
}: IProps) => {
  const activeStep = steps?.find((st) => st.index === activeStepIndex);
  const activeIndexStep = steps?.findIndex(
    (st) => st.index === activeStepIndex
  );

  if (!steps || activeIndexStep < 0) return null;

  return (
    <div>
      {activeIndexStep < steps?.length - 1 && (
        <S.GoBack>
          <Link
            href={activeIndexStep === 0 ? '/' : steps[activeIndexStep - 1].link}
          >
            <span className="fa-flex fa-items-center">
              <BackIcon size={12} /> <span>Volver</span>
            </span>
          </Link>
        </S.GoBack>
      )}

      <S.Wrapper>{generateSteps(steps, activeStepIndex, pathName)}</S.Wrapper>
      {activeStep && <S.Label>{activeStep.name}</S.Label>}
    </div>
  );
};

export { CheckoutProgressBar };
