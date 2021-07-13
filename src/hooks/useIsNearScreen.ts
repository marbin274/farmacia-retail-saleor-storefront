import { useEffect, useRef, useState } from "react";

const useIsNearScreen = (distance: string = '100px') => {
  const [show, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer;

    const onChange = (entries, observer) => {
      const element = entries[0];
      if (element.isIntersecting) {
        setShow(true);
        observer.disconnect();
      }
    };

    Promise.resolve(
      typeof IntersectionObserver !== "undefined"
        ? IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance,
      });
      observer.observe(fromRef.current);
    });

    return () => observer && observer.disconnect();
  });

  return {
    isNearScreen: show,
    fromRef,
  };
};

export default useIsNearScreen;