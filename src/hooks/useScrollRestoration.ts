import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

/**
 * 스크롤 복원 custom hook
 * @description `_app.tsx`에서 사용
 */
export const useScrollRestoration = ({
  targetPathname,
  fromPathname,
}: {
  /** 스크롤 복원을 원하는 pathname */
  targetPathname: string;
  /** 이전 페이지 pathname */
  fromPathname?: string;
}) => {
  const router = useRouter();
  const scrollYPosition = useRef(0);

  useEffect(() => {
    const onRouteChangeStart = () => {
      if (router.pathname === targetPathname) {
        scrollYPosition.current = window.scrollY;
      }
    };

    const onRouteChangeComplete = (path: string) => {
      if (path === targetPathname) {
        if (fromPathname && router.pathname !== fromPathname) return;

        scrollTo({ top: scrollYPosition.current });
      }
    };

    router.events.on('routeChangeStart', onRouteChangeStart);
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart);
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router, targetPathname, fromPathname]);
};
