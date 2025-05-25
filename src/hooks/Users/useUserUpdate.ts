import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "contexts/Alert";
import apiService from "services";
import { User } from "src/models/Users";

interface UpdateUserProps {
  user: User,
  callback?: ()=> void;
}

export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const { addAlert } = useAlert();

  const {
    mutate: updateUser,
    data,
    isPending: isSaving,
    status,
    error,
  } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: async ({ user } : UpdateUserProps) => {
      const { data: response } = await apiService.updateUser(user);
      return response;
    },
    onSuccess: (user: User, { callback }: UpdateUserProps) => {
      queryClient.setQueryData(['fetch-users'], (prev: User[]) => {
        return prev.map((prevUser) => prevUser.id === user.id ? user : prevUser);  
      });
      callback?.();
      addAlert(`Successfully updated ${user.name}`, { status: 200 });
    }
  }
  );

  return {
    data,
    status,
    isSaving,
    updateUser,
    error,
  };
}