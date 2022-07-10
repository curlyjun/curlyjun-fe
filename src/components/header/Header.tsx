import { useUserQuery } from '@hooks/useUserQuery';
import Cookies from 'js-cookie';
import Link from 'next/link';
import * as Styled from './Header.style';
import * as cookieName from '@/constants/cookies';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const userId = Cookies.get(cookieName.USER_ID);
  const user = useUserQuery(userId);

  const logout = () => {
    Cookies.remove(cookieName.USER_ID);
    Cookies.remove(cookieName.ACCESS_TOKEN);
    user.refetch();
  };

  return (
    <Styled.Header>
      <Link href='/'>
        <Styled.Title>HAUS</Styled.Title>
      </Link>
      {user.data ? (
        <Styled.UserInfo>
          <Styled.UserName>{user.data.NAME}</Styled.UserName>
          <Styled.Button onClick={logout}>Logout</Styled.Button>
        </Styled.UserInfo>
      ) : (
        <Link href='/login'>
          <Styled.Button>Login</Styled.Button>
        </Link>
      )}
    </Styled.Header>
  );
};

export default Header;
