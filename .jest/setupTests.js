import { defaultTheme } from "@styles";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { ThemeConsumer } from "styled-components";

// set default theme for enzyme renderer
ThemeConsumer._currentValue = defaultTheme;
configure({ adapter: new Adapter() });

// silence all console.errors in tests
console.error = jest.fn();
