import Cookies from 'js-cookie';
import Link from 'next/link';

import * as cookieName from '@/constants/cookies';
import { useUserQuery } from '@/hooks/queries/useUserQuery';

import * as Styled from './Header.style';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const {
    data: user,
    refetch: refetchUser,
    isFetched: isFetchedUser,
  } = useUserQuery(Cookies.get(cookieName.USER_ID));

  const logout = () => {
    Cookies.remove(cookieName.USER_ID);
    Cookies.remove(cookieName.ACCESS_TOKEN);
    refetchUser();
  };

  return (
    <Styled.Header>
      <Link href='/'>
        <Styled.Title>HAUS</Styled.Title>
      </Link>
      {isFetchedUser &&
        (user ? (
          <Styled.UserInfo>
            <Styled.UserName>{user.NAME}</Styled.UserName>
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
