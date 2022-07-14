import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('에러:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container>
          <h1>오류가 발생했어요.</h1>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const Container = styled.main`
  width: 100%;
  text-align: center;
  padding-top: 200px;
  h1 {
    font-size: 32px;
    font-weight: bold;
  }
`;
