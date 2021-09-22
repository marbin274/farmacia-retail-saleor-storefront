import { storiesOf } from '@storybook/react';
import { styled } from '@styles';
import React from 'react';
import { links } from '@app/pages/AccountPage/paths';

const Wrapper = styled.div`
  width: 360px;
`;

const PROPS = {
  active: '/account/',
  links,
};

import { AccountMenu } from '.';
storiesOf('@components/molecules/AccountMenu', module)
  .addParameters({ component: AccountMenu })
  .addDecorator((story) => story())
  .add('default', () => (
    <Wrapper>
      <AccountMenu {...PROPS} />
    </Wrapper>
  ));
