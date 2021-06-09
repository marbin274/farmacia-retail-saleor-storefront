import { styled } from "@styles";

export const Wrapper = styled.div`
display: flex;
left: 0;
margin-top: 1rem;
position: absolute;
z-index:1;
width: 100vw;
height: 100vh;
background-color: rgba(184, 188, 213, 0.8);
a {
    text-transform: capitalize;
    span {
        text-transform: capitalize;
    }
}
`;

export const Overlay = styled.div`
    display: flex;
    height: max-content;
`;

export const lvl1List = styled.ul`
background-color: ${({ theme }) => theme.colors.white};
border-bottom-left-radius: 1rem;
height: max-content;
width: 17rem;
min-width: 17rem;
padding: 1rem 0rem 0rem;
position: relative;
z-index: 2;
li {   
    :hover {
        background-color: ${({ theme }) => theme.colors.interactive};
        > a {
            color: ${({ theme }) => theme.colors.white};
        }
        path {
            fill: ${({ theme }) => theme.colors.white};
        }
    }
    :last-child {
        border-bottom-left-radius: 1rem;
    }
    > a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        font-size: ${({theme})=> theme.typography.labelFontSize};
        font-weight: normal;
        width: 100%;
    }
    > svg {
        cursor: pointer;
    }
}
`;

export const OverlayNavItems = styled.div`
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    border-bottom-left-radius: 0.625rem;
    border-bottom-right-radius: 0.625rem;
    height: max-content;
    padding: 2rem 2rem 2rem 0.5rem;
    position: relative;
    width: 100%;
    z-index: 1;
`;

export const OverlayNavItemTitle = styled.div`
    align-items: center;
    display: flex;
    padding-bottom: 1rem;
    padding-left: 1rem;
    > h4 {
        font-weight: ${({ theme }) => theme.typography.boldFontWeight};
    }
    button {
        margin-left: 1rem;
        padding: 0.2rem 1rem;
        > span {
            font-size: 0.875rem;
        }
    }
`;

export const divide = styled.hr`
    margin-left: 1rem;
`;

export const lvl2List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    > li {
        padding: 1rem 0rem;
        width: 25%;
        > div {
            padding-left: 1rem;
            > a {
                font-size: ${({theme})=> theme.typography.smallFontSize};
            }
        } 
    }
`;

export const lvl3List = styled.ul`
    margin-top: 1rem;
    li {
        a {
            font-size: ${({theme})=> theme.typography.labelFontSize};
            font-weight: normal;
            padding: .5rem 0rem .5rem 1rem;
            :hover {
                background-color: ${({ theme }) => theme.colors.white};
            }
        }  
    }
    
`;
