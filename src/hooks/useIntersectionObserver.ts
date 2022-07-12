import { RefObject, useEffect } from 'react';

interface UseIntersectionObserverParams {
  targetRef: RefObject<HTMLElement>;
  rootMargin?: string | undefined;
  onIntersect: () => void;
}

export const useIntersectionObserver = ({
  targetRef,
  rootMargin,
  onIntersect,
}: UseIntersectionObserverParams) => {
  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting && onIntersect();
        });
      },
      { rootMargin }
    );

    targetRef.current && observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
