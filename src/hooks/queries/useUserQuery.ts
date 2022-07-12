import axios from 'axios';
import { useQuery } from 'react-query';

interface UserResponse {
  data: {
    user: {
      ID: string;
      NAME: string;
    };
  };
}

export const fetchUser = async (userId: string | undefined) => {
  if (!userId) return null;

  const { data } = await axios.get<UserResponse>(`/users/${userId}`);

  return data.data.user;
};

export const useUserQuery = (userId: string | undefined) => {
  return useQuery(['user', userId], () => fetchUser(userId));
};
