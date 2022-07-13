import { useRef } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface IntersectionCheckerProps {
  onIntersect: () => void;
}

const IntersectionChecker = ({ onIntersect }: IntersectionCheckerProps) => {
  const ref = useRef(null);
  useIntersectionObserver({ targetRef: ref, onIntersect });

  return <div ref={ref} />;
};

export default IntersectionChecker;
