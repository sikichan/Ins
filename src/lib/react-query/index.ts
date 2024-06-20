import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount, createPost, logout, signInAccount } from '@/lib/appwrite/api.ts';
import { INewPost, INewUser } from '@/types';
import { QUERY_KEYS } from './queryKeys.ts';

export const useCreateAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createAccount(user),
  });
};

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signInAccount(user),
  });
};
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
