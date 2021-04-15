import { styled } from "@styles";

export const Wrapper = styled.div`
    border-radius: 1rem;
    background: ${({theme}) => theme.colors.backgroundLight}
`;

export const Title = styled.div`
    color: ${({theme}) => theme.colors.aunaBrand3}
    font-size: ${({theme}) => theme.typography.baseFontSize}
    font-weight: ${({theme}) => theme.typography.normalFontWeight}
    padding: 1rem 2rem;
`;

export const TitleText = styled.span``;

export const Body = styled.div`
    color: ${({theme}) => theme.colors.shippingMethodBlack}
    border-top: 1px solid ${({theme}) => theme.colors.aunaGreyDark};
    border-bottom: 1px solid ${({theme}) => theme.colors.aunaGreyDark};
    font-size: ${({theme}) => theme.typography.smallFontSize}
    font-weight: ${({theme}) => theme.typography.normalFontWeight}
    padding: 0rem 2rem;
`;
export const LineInfo = styled.div`   
    display: flex;    
    margin: 1rem 0rem;
`;
export const LineInfoDescription = styled.div`
    flex: 1;
`;
export const LineInfoPrice = styled.div``;

export const Footer = styled.div`
    color: ${({theme}) => theme.colors.shippingMethodBlack}
    font-size: ${({theme}) => theme.typography.baseFontSize}
    font-weight: ${({theme}) => theme.typography.boldFontWeight}
    padding: 1rem 2rem;
    > div {
        margin: 0px;
    }
`;

