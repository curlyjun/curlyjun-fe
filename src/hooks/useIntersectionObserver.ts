import { RefObject, useEffect } from 'react';

export const useIntersectionObserver = ({
  targetRef,
  onIntersect,
}: {
  targetRef: RefObject<HTMLElement>;
  onIntersect: () => void;
}) => {
  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && onIntersect();
      });
    });

    targetRef.current && observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
