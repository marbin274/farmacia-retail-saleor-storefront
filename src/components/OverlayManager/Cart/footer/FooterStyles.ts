import { styled } from "@styles";
import { grisesNegro, neutralDark, neutralDarkest } from "@temp/@next/globalStyles/constants";

export const Container = styled.div`
    align-items: center;
    background-color: #fff;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    position: absolute;
    width: 100%;
    > div {
        flex: 1;
    }
`;

export const Details = styled.div`
    text-align: center;
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

export const DetailsPriceTotal = styled(DetailsPrice as any)`
    color: ${neutralDarkest};
    flex: 1;
    text-align: right;
`;

export const SubTotalLabel = styled.span`
    color: ${neutralDark};
`;

export const SubTotalPrice = styled.span`
    color: ${neutralDarkest};
`;

export const TotalLabel = styled.span`
    color: ${neutralDark};
`;

export const TotalPrice = styled.span`
    color: ${grisesNegro};
    font-size: ${({ theme }) => theme.typography.bigFontSize};
    font-weight: ${({ theme }) => theme.typography.boldFontWeight};
`;

export const ButtonContainer = styled.div`
    text-align: center;
`;
