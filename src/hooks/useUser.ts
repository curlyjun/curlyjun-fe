import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

interface UserResponse {
  data: {
    user: {
      ID: string;
      NAME: string;
    };
  };
}

const fetchUser = async () => {
  const userId = Cookies.get('sixshop_user_id');
  if (!userId) return null;

  const { data } = await axios.get<UserResponse>(`/users/${userId}`);

  return data.data.user;
};

export const useUser = (redirectToIfFound?: string) => {
  const { data, isFetched } = useQuery('user', fetchUser);
  const router = useRouter();

  useEffect(() => {
    if (!isFetched || !redirectToIfFound) return;

    if (redirectToIfFound && data) {
      router.push(redirectToIfFound);
    }
  }, [data, isFetched, redirectToIfFound, router]);

  return data;
};
