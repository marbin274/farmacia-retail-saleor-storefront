import { styled } from "@styles";
import farmatheme from "@farmatheme";

export const List = styled.ul<{morePadding: boolean}>`
    height: calc(100% - 6.75rem);
    padding: 1rem 1.5rem ${({ morePadding }) => morePadding ? "20rem" : ""};
    overflow: auto;

    @media (max-width: $small-screen) {
        background-color: ${farmatheme.theme.colors.neutral.light};
        height: auto;
        min-height: calc(100% - 6rem);
        padding: 0;
        padding-bottom: 13.25rem;
    }
`;
