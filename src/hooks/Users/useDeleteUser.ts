import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlert } from "contexts/Alert";
import apiService from "services";
import { User } from "src/models/Users";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { addAlert } = useAlert();

  const {
    mutate: deleteUser,
    data,
    isPending: isDeleting,
    status,
    error,
  } = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async (userId: User['id']) => {
      const { data: response } = await apiService.deleteUser(userId);
      return response;
    },
    onSuccess: (_, userId: User['id']) => {
      queryClient.setQueryData(['fetch-users'], (prev: User[]) => {
        return prev.filter((prevUser) => prevUser.id !== userId);  
      });
      addAlert('Successfully deleted the user', { status: 200 });
    }
  }
  );

  return {
    data,
    isDeleting,
    status,
    deleteUser,
    error,
  };
}