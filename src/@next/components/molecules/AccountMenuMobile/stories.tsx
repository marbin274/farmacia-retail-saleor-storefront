import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";
import { MemoryRouter } from "react-router";

import { AccountMenuMobile } from ".";

const Wrapper = styled.div`
  margin-top: 100px;
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

storiesOf("@components/molecules/AccountMenuMobile", module)
  .addParameters({ component: AccountMenuMobile })
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <Wrapper>
      <AccountMenuMobile {...PROPS} />
    </Wrapper>
  ));
