import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";
import { CartResume } from ".";
import { DEFAULT_PROPS } from "./fixtures";


describe("<CartResume />", () => {
    it("exists", () => {
        const wrapper = shallow(
            <CartResume
                totalProducts={DEFAULT_PROPS.totalProducts}
            />
        );
        expect(wrapper.exists()).toEqual(true);
    });

    it("should show shipping price", () => {
        const wrapper = mount(
            <CartResume
                shippingPrice={DEFAULT_PROPS.shipping}
                totalProducts={DEFAULT_PROPS.totalProducts}
            />
        );
        expect(wrapper.text()).toContain(DEFAULT_PROPS.shipping.gross.amount);
    });

    it("should show promo price", () => {
        const wrapper = mount(
            <CartResume
                promoPrice={DEFAULT_PROPS.promoCode}
                totalProducts={DEFAULT_PROPS.totalProducts}
            />
        );
        expect(wrapper.text()).toContain(DEFAULT_PROPS.promoCode.gross.amount);
    });

    it("should show total price", () => {
        const wrapper = mount(
            <CartResume
                totalPrice={DEFAULT_PROPS.total}
                totalProducts={DEFAULT_PROPS.totalProducts}
            />
        );
        expect(wrapper.text()).toContain(DEFAULT_PROPS.total.gross.amount);
    });

    it("should show count one product", () => {
        const wrapper = mount(<CartResume totalProducts={1} />);
        expect(wrapper.text()).toContain("1 Producto");
      });
    
      it("should show total count products", () => {
        const wrapper = mount(<CartResume totalProducts={2} />);
        expect(wrapper.text()).toContain("2 Productos");
      });
});
