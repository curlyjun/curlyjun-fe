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
          <h1>HAUS</h1>
          <p>오류가 발생했어요.</p>
          <button onClick={() => (window.location.href = '/')}>홈으로 가기</button>
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

  button {
    margin-top: 40px;
    padding: 10px 20px;
    color: #6d6bd1;
    border: 1px solid #6d6bd1;
    border-radius: 5px;
    cursor: pointer;
  }
`;
