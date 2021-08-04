
export const useScrollTo = () => {

    const goTop = () => {
        window.scrollTo({
            behavior: "smooth",
            top: 0,
        });
    }

    return {
        goTop,
    };
}

