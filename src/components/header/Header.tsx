import { useUser } from '@hooks/useUser';
import Cookies from 'js-cookie';
import Link from 'next/link';
import * as Styled from './Header.style';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const user = useUser();

  const logout = () => {
    Cookies.remove('sixshop_user_id');
    Cookies.remove('sixshop_access_token');
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
