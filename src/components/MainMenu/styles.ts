import { mediaUp, styled } from "@styles";

export const Wrapper = styled.nav`
    background-color: ${({ theme }) => theme.colors.aunaBlack};
    padding: 0rem 0rem 1rem;
    width: 100%;
    margin-top: 8.9rem;
    ${mediaUp.smallScreen`
        margin-top: 9.3rem;
    `}
    ${mediaUp.largeScreen`
        padding: 1rem 0rem;
        margin-top: 4.75rem;
    `}
     > .container {
         padding: 0rem;
     }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    ${mediaUp.largeScreen`
        flex-direction: row;
    `}

    .search__products--expanded {
        top: 8rem;
    }
`;

export const Menu = styled.div`
    display: none;
    ${mediaUp.largeScreen`
        display: block;
    `}
`;

export const Search = styled.div`
    display: block;
    position: relative;
    ${mediaUp.largeScreen`
        display: none;
    `}
    .search {
        min-height: initial;
        &__input {
          margin-top: 0px;
          padding: 0px;
          touch-action: none;
          -ms-touch-action: none;
          .input {
              padding: 0rem 1rem 1rem 1rem;
              &__field {
                color: ${({ theme }) => theme.colors.white};
                &::placeholder {
                color: ${({ theme }) => theme.colors.white};
                }
              }
          }
        }
        &__products {
          position: absolute;
          left: 0;
          z-index: 3;
        }
      }
`;

export const WrapperAddressGeo = styled.div`
    width: 100%;
    ${mediaUp.largeScreen`
        width: 20rem;
    `}
`;
