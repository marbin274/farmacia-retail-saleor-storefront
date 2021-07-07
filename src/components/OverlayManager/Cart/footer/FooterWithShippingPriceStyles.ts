import { mediaUp, styled } from "@styles";
import { aunaBrand3, aunaDiscount, aunaInformativeLightest, aunaInteractive, neutralDark, neutralDarkest, white } from "@temp/@next/globalStyles/constants";
import { Money } from "@components/containers";

export const Container = styled.div`
    align-items: center;
    background-color: #fff;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    width: 100%;
`;

export const Details = styled.div`
    flex: 1;
    padding: 1.5rem 1rem 0rem;
    text-align: center;
    width: 100%;
`;

export const FreeShipping = styled.div`
    background-color: ${aunaInformativeLightest};
    color: ${aunaBrand3};
    display: flex;
    justify-content: space-between;
    padding: 1rem 0.5rem;
    width: 100%;
    strong {
        font-weight: ${({ theme }) => theme.typography.boldFontWeight};
    }
`;

export const InfoIcon = styled.div`
    cursor: pointer;
    position: relative;
`;

export const ToolTipContainer = styled.div`
    background-color: #00295B;
    border-radius: 0.5rem;
    bottom: -2.0625rem;
    padding: 1rem;
    position: absolute;
    right: 2.1875rem;
    width: 16.5625rem;
    :after {
        border-color: transparent transparent transparent #00295B;
        border-style: solid;
        border-width: 0.7rem;
        bottom: 2.0625rem;
        content: ' ';
        position: absolute;
        right: -1.375rem;
        z-index: 1;
    }
`;

export const ToolTipText = styled.span`
    color: ${white};
    font-size: ${({ theme }) => theme.typography.smallFontSize};
    strong {
        font-weight: 600;
    }
    .free {
        color: ${aunaInteractive};
    }
`;

export const DetailsPrice = styled.div`
    align-items: center;
    display: flex;
    font-weight: 400;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.typography.smallFontSize};
    font-style: normal;
    line-height: 1.5rem;
    padding-bottom: 0.75rem;
`;

export const DetailsPriceLabel = styled.span`
    flex: 2;
    text-align: left;
    span {
        color: ${neutralDark};
    }
`;

export const DetailsPriceTotal = styled.span`
    color: ${neutralDarkest};
    flex: 1;
    text-align: right;
`;

export const DetailsDiscount = styled(DetailsPrice as any)`
    color: ${aunaDiscount};
`;


export const ShippingMethodLabel = styled.span`
    color: ${neutralDarkest};
    font-weight: ${({ theme }) => theme.typography.boldFontWeight};
`;

export const ShippingMethod = styled.span`
    align-items: center;
    display: flex;
    flex: 3;
    font-size: ${({ theme }) => theme.typography.labelFontSize};
    margin: 0rem .5rem;
`;

export const ShippingMethodName = styled.span`
    background-color: ${({ theme }) => theme.colors.aunaInformativeLightest};
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.aunaBrand3};
    display: block;                
    font-size: ${({ theme }) => theme.typography.labelFontSize};
    font-weight: ${({ theme }) => theme.typography.boldFontWeight};
    padding: 0.125rem 0.375rem;
    text-transform: capitalize;
    width: max-content;
`;

export const ShippingMethodPrice = styled.span`
    color: ${({ theme }) => theme.colors.greyText};
`;

export const ShippingMethodFree = styled.span`
    color: ${({ theme }) => theme.colors.aunaBrand3};
`;

export const ShippingMethodTotal = styled(Money)`
    flex: 1;
    font-weight: ${({ theme }) => theme.typography.boldFontWeight};
    text-align: right;
`;

export const ButtonContainer = styled.div`
    margin-top: 0.9375rem;
    padding: 0rem 1rem 1rem;
    text-align: center;
    width: 100%;
    button {
        ${mediaUp.mediumScreen`
            width: 85%;
        `}
    }
`;
