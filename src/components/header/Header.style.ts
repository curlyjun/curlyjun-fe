import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.a`
  font-size: 48px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-weight: bold;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 8px;
  background-color: #6d6bd1;
  color: #fff;
  font-weight: bold;

  :hover {
    background-color: #5553c4;
  }
`;
