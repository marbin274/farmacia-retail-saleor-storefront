import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";

const Wrapper = styled.div`
  width: 360px;
`;

const PROPS = {
  active: "/account/",
  links: [
    {
      label: "Mi perfil",
      url: "/account/",
    },
    {
      label: "Mis direcciones",
      url: "/address-book/",
    },
  ],
};

import { MemoryRouter } from "react-router";
import { AccountMenu } from ".";
storiesOf("@components/molecules/AccountMenu", module)
  .addParameters({ component: AccountMenu })
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <Wrapper>
      <AccountMenu {...PROPS} />
    </Wrapper>
  ));
