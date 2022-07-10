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
  const queryResult = useQuery('user', fetchUser);
  const router = useRouter();

  useEffect(() => {
    if (!queryResult.isFetched || !redirectToIfFound) return;

    if (redirectToIfFound && queryResult.data) {
      router.push(redirectToIfFound);
    }
  }, [queryResult, redirectToIfFound, router]);

  return queryResult;
};
