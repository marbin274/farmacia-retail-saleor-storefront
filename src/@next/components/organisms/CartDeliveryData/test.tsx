import { shallow, mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import  { CartDeliveryData }  from ".";
import { LineDetailDeliveryData } from "./CartDeliveryData";
import { Iprops } from './types';
import { checkoutMock, PROPS_LINE_DETAIL } from './fixtures';

const PROPS: Iprops = {
  checkout: checkoutMock,
}

describe("<CartDelivery/>", ()=>{
  it("exists", ()=>{
    const wrapper = shallow(<CartDeliveryData {...PROPS}/>);
    expect(wrapper.exists()).toEqual(true)
  });

  it("should show data checkout", ()=>{
    const wrapper = mount(<CartDeliveryData {...PROPS}/>);
    const text = wrapper.render().text();
    const shippingAddress = PROPS.checkout?.shippingAddress;
    const direction = `${shippingAddress?.streetAddress1} ${shippingAddress?.city} ${shippingAddress?.country?.country}`;
    expect(text).toContain(PROPS.checkout?.billingAddress?.firstName);
    expect(text).toContain(PROPS.checkout?.documentNumber);
    expect(text).toContain(PROPS.checkout?.email);
    expect(text).toContain(PROPS.checkout?.billingAddress?.phone);
    expect(text).toContain(direction);
    expect(text).toContain(PROPS.checkout?.billingAddress?.streetAddress2);
    expect(text).toContain(PROPS.checkout?.shippingMethod?.name);
  })
})

describe("<LineDetailDeliveryData/>", ()=>{
  it("exists", ()=>{
    const wrapper = mount(<LineDetailDeliveryData text="miText"/>);
    expect(wrapper.exists()).toEqual(true);
  })
  it("should not show label with : when props label not send", ()=>{
    const wrapper = mount(<LineDetailDeliveryData {...PROPS_LINE_DETAIL}/>);
    const text = wrapper.render().text();
    expect(text).toContain(PROPS_LINE_DETAIL.text)
    expect(text).toContain(PROPS_LINE_DETAIL.label+":");
  })
  it("not should  show label with : when props label not send", ()=>{
    const wrapper = mount(<LineDetailDeliveryData text={PROPS_LINE_DETAIL.text}/>);
    const text = wrapper.render().text();
    expect(text).toContain(PROPS_LINE_DETAIL.text)
    expect(text).not.toContain(PROPS_LINE_DETAIL.label+":");
  })
});
