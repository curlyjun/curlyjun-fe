import { ReactNode } from 'react';

import * as Styled from './NotFoundContent.style';

interface NotFoundContentProps {
  children: ReactNode;
}

const NotFoundContent = ({ children }: NotFoundContentProps) => {
  return <Styled.Container>{children}</Styled.Container>;
};

export default NotFoundContent;
