import { ImgHTMLAttributes, useRef } from 'react';
import { useState } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import * as Styled from './LazyLoadingImage.style';

const PLACEHOLDER_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8DtXNJsAAAAASUVORK5CYII=';

interface LazyLoadingImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

const LazyLoadingImage = ({ src, ...rest }: LazyLoadingImageProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);
  useIntersectionObserver({
    targetRef: ref,
    rootMargin: '100px',
    onIntersect: () => {
      setVisible(true);
    },
  });
  return <Styled.Image ref={ref} {...rest} src={visible ? src : PLACEHOLDER_IMG} />;
};

export default LazyLoadingImage;
