import { shallow, mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import  { CartDeliveryDataModal }  from ".";
import { IProps } from './types';
import { checkoutMock } from '../CartDeliveryData/fixtures';


const DEFAULT_PROPS:IProps = {
  checkout: checkoutMock,
  formId: "address-form",
  hideModal: jest.fn(),
  title: "This is title",
};

describe("<CartDelivery/>", ()=>{
  it("exists", ()=>{
    const wrapper = shallow(<CartDeliveryDataModal {...DEFAULT_PROPS}/>);
    expect(wrapper.exists()).toEqual(true)
  });

  it("should have correct title ", () => {
    const wrapper = mount(<CartDeliveryDataModal {...DEFAULT_PROPS} />);
    expect(wrapper.props().title).toEqual(DEFAULT_PROPS.title);
  });

 
})

