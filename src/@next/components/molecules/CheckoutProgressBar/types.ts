export interface IStep {
  index: number;
  link: string;
  name: string;
}
export interface IProps {
  steps: IStep[];
  activeStepIndex: number;
  requestPayload: string | null;
  currentRoutePath: string;
}
