import { storiesOf } from '@storybook/react';
import React from 'react';
import { CartSummary } from '.';
import { DEFAULT_PROPS } from './fixtures';

storiesOf('@components/organisms/CartSummary', module)
  .addParameters({ component: CartSummary })
  .addDecorator((getStory) => getStory())
  .add('default', () => <CartSummary {...DEFAULT_PROPS} />);
