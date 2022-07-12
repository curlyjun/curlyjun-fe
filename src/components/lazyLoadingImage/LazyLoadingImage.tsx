import { ImgHTMLAttributes, useRef } from 'react';
import { useState } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import * as Styled from './LazyLoadingImage.style';

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
  return <Styled.Image ref={ref} {...rest} src={visible ? src : '/defaultThumbnail.jpg'} />;
};

export default LazyLoadingImage;
