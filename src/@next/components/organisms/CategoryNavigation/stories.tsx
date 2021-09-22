import { storiesOf } from '@storybook/react';
import React from 'react';
import { CategoryNavigation } from '.';
import { DEFAULT_PROPS } from './fixtures';

storiesOf('@components/organisms/CategoryNavigation', module)
  .addParameters({ component: CategoryNavigation })
  .addDecorator((getStory) => getStory())
  .add('default', () => <CategoryNavigation {...DEFAULT_PROPS} />);
