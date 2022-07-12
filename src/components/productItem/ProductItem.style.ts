import styled from 'styled-components';

export const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
  :hover {
    transition: 0.2s;
    opacity: 0.8;
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

export const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

export const Price = styled.div`
  margin-top: 4px;
`;
