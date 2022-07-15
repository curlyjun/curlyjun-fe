import axios from 'axios';
import { useMutation } from 'react-query';

interface LoginResponse {
  data: {
    accessToken: string;
    user: {
      ID: string;
      PASSWORD: string;
    };
  };
}

const login = async (loginInfo: { id: string; password: string }) => {
  const { data } = await axios.post<LoginResponse>('/login', loginInfo);
  return data.data;
};

export const useLoginMutation = () => {
  return useMutation(login);
};
