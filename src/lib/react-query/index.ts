import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  createAccount,
  logout,
  signInAccount,
} from '@/lib/appwrite/api.ts';
import { INewUser } from '@/types';

export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createAccount(user),
  });
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (user: {
      email: string;
      password: string;
    }) => signInAccount(user),
  });
};
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
  });
};
