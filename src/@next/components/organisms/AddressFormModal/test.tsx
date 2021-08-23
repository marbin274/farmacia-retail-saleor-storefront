import { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import React from 'react';

import { AddressFormModal } from '.';
import { IAddressFormModalProps } from './types';

jest.mock('@sdk/react', () => ({
  useCreateUserAddress: () => [jest.fn(), { data: null, error: null }],
  useUpdateUserAddress: () => [jest.fn(), { data: null, error: null }],
}));

const DEFAULT_PROPS: IAddressFormModalProps = {
  hideModal: jest.fn(),
  onSubmit: jest.fn(),
  title: 'My title',
};

describe('<AddressFormModal />', () => {
  it('exists', () => {
    const wrapper = shallow(<AddressFormModal {...DEFAULT_PROPS} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('should have correct title and submit button text', () => {
    const wrapper = mount(<AddressFormModal {...DEFAULT_PROPS} />);
    expect(wrapper.props().title).toEqual(DEFAULT_PROPS.title);
  });
});
