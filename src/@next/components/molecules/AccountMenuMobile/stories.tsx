import { storiesOf } from '@storybook/react';
import { styled } from '@styles';
import React from 'react';
import { AccountMenuMobile } from '.';
import { links } from '@app/pages/AccountPage/paths';

const Wrapper = styled.div`
  margin-top: 100px;
  width: 360px;
`;

const PROPS = {
  active: '/account/',
  links,
};

storiesOf('@components/molecules/AccountMenuMobile', module)
  .addParameters({ component: AccountMenuMobile })
  .addDecorator((story) => story())
  .add('default', () => (
    <Wrapper>
      <AccountMenuMobile {...PROPS} />
    </Wrapper>
  ));
