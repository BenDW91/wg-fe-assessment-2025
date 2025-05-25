import { useQuery } from "@tanstack/react-query";
import { apiService } from "services";

export const useUsers = () => {
 const {
    data,
    status: fetchStatus,
    isFetching,
    refetch: refetchUsers,
    error,
  } = useQuery({
    queryKey: ['fetch-users'],
    queryFn: async () => {
      const { data: response } = await apiService.getUsers();
      return response;
    },
  });

  return {
    users: data || [],
    isFetching,
    fetchStatus,
    refetchUsers,
    error,
  }
}