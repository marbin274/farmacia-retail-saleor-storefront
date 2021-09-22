import { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import React from 'react';

import { ThankYou } from '.';
import { steps } from './fixtures';

describe('<ThankYou />', () => {
  const orderNumber = '123';
  const sequentialCode = 'F53E053E';
  const orderDetailsMock = jest.fn();
  const continueShoppingMock = jest.fn();

  it('exists', () => {
    const wrapper = shallow(
      <ThankYou
        steps={steps}
        totalProducts={3}
        orderNumber={orderNumber}
        orderDetails={orderDetailsMock}
        continueShopping={continueShoppingMock}
        sequentialCode={sequentialCode}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it('should contain sequential code', () => {
    const wrapper = shallow(
      <ThankYou
        steps={steps}
        totalProducts={3}
        orderNumber={orderNumber}
        orderDetails={orderDetailsMock}
        continueShopping={continueShoppingMock}
        sequentialCode={sequentialCode}
      />
    );

    expect(wrapper.text()).toContain(sequentialCode);
  });

  it('should call continueShopping function when clicked', () => {
    const wrapper = mount(
      <ThankYou
        steps={steps}
        totalProducts={3}
        orderNumber={orderNumber}
        orderDetails={orderDetailsMock}
        continueShopping={continueShoppingMock}
        sequentialCode={sequentialCode}
      />
    );

    wrapper.find('button').at(0).simulate('click');

    expect(continueShoppingMock).toHaveBeenCalled();
  });
});
