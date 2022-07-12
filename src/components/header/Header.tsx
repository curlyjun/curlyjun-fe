import Cookies from 'js-cookie';
import Link from 'next/link';

import * as cookieName from '@/constants/cookies';
import { useUserQuery } from '@/hooks/queries/useUserQuery';

import * as Styled from './Header.style';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const userId = Cookies.get(cookieName.USER_ID);
  const userQuery = useUserQuery(userId);

  const logout = () => {
    Cookies.remove(cookieName.USER_ID);
    Cookies.remove(cookieName.ACCESS_TOKEN);
    userQuery.refetch();
  };

  return (
    <Styled.Header>
      <Link href='/'>
        <Styled.Title>HAUS</Styled.Title>
      </Link>
      {userQuery.isFetched &&
        (userQuery.data ? (
          <Styled.UserInfo>
            <Styled.UserName>{userQuery.data.NAME}</Styled.UserName>
            <Styled.Button onClick={logout}>Logout</Styled.Button>
          </Styled.UserInfo>
        ) : (
          <Link href='/login'>
            <Styled.A>Login</Styled.A>
          </Link>
        ))}
    </Styled.Header>
  );
};

export default Header;
