import { styled } from "@styles";

export const Wrapper = styled.div`
    display: flex;
    padding: 0rem 1rem;
    width: 100%;
    > button {        
        padding: 0.875rem 1.9rem;
        > span {
            display: flex;
            font-size: ${({theme})=> theme.typography.smallFontSize};
            font-weight:  ${({theme})=> theme.typography.boldFontWeight};
            > span {
                margin-left: 0.5rem;
            }
        }
    }
    ul {
        align-items: center;
        color: ${({theme})=> theme.colors.white};
        display: flex;
        list-style-type: none;
        flex-wrap: wrap;
        font-size: ${({theme})=> theme.typography.smallFontSize};
        font-style: normal;
        font-weight:  ${({theme})=> theme.typography.boldFontWeight};
        line-height: ${props => props.theme.typography.baseLineHeight};
        margin: 0; 
        li {            
            padding: 0rem 1rem;
            text-align: center;
            a {
                text-transform: capitalize;
            }
        }
      }
`;

