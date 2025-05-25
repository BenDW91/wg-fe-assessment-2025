import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "contexts/Alert";
import apiService from "services";
import { User } from "src/models/Users";

interface CreateUserProps {
  user: User,
  callback?: ()=> void;
}

export const useUserCreate = () => {
  const queryClient = useQueryClient();
  const { addAlert } = useAlert();

  const {
    mutate: createUser,
    data,
    isPending: isCreating,
    status,
    error,
  } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async ({user}: CreateUserProps) => {
      const { data: response } = await apiService.createUser(user);
      return response;
    },
    onSuccess: (user, { callback}: CreateUserProps) => {
      queryClient.setQueryData(['fetch-users'], (prev: User[]) => {
        return [
          user,
          ...prev
        ];  
      });
      callback?.();
      addAlert(`Successfully created ${user.name}`, { status: 200 });
    }
  }
  );

  return {
    data,
    status,
    isCreating,
    createUser,
    error,
  };
}