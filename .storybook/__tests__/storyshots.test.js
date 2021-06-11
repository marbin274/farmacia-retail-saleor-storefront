import initStoryshots from "@storybook/addon-storyshots";
import { multiSnapshotWithOptions } from "@storybook/addon-storyshots/dist/test-bodies";
import styleSheetSerializer from "jest-styled-components/src/styleSheetSerializer";
import { addSerializer } from "jest-specific-snapshot";

jest.mock("react-dom", () => ({
  createPortal: node => node,
  findDOMNode: () => {},
}));

jest.mock("@sdk/optimizelyConfig", () => ({
  trackAddToCart: jest.fn(),
  useAddToCartButtonVariable: () => "Agregar",
}));

jest.mock("@sdk/optimizelyConfig", () => ({
  trackAddToCart: jest.fn(),
  useAddToCartButtonVariable: () => "Agregar",
}));

global.matchMedia = media => ({
  addListener: jest.fn(),
  matches: true,
  removeListener: jest.fn(),
});

addSerializer(styleSheetSerializer);

initStoryshots({
  framework: "react",
  test: multiSnapshotWithOptions({}),
});
