import { Button, IconButton, Skeleton, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Card from "components/Card";
import { useUsers } from "hooks/Users";
import { SortDirection, useSortBy } from "hooks/useSortBy";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useCallback, useState } from "react";
import { User } from "src/models/Users";
import SortableHeader from "./SubComponents/SortableHeader";
import { Edit2, Plus, Trash } from "lucide-react";
import { ActionsCell, UserTable } from "./Users.style";
import { useConfirmation } from "contexts/ConfirmDialog";
import { useDeleteUser } from "hooks/Users/useDeleteUser";
import { useUserUpdate } from "hooks/Users/useUserUpdate";
import EditRow from "./SubComponents/EditRow";
import AddUserForm from "./SubComponents/AddUserForm";
import { useUserCreate } from "hooks/Users/useUserCreate";

const Users = () => {
  const requestConfirm = useConfirmation();
  const { users, isFetching } = useUsers();
  const { deleteUser, isDeleting } = useDeleteUser();
  const { updateUser, isSaving } = useUserUpdate();
  const { createUser, isCreating } = useUserCreate();

  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useLocalStorage<keyof User>('users.sortBy', 'name');
  const [sortDirection, setSortDirection] = useLocalStorage<SortDirection>('users.sortDir', 'asc');
  const [userToEdit, setUserToEdit ] = useState<User | undefined>()
  const sortedUsers = useSortBy(users, sortBy, sortDirection);

  const handleSort = useCallback((key: string) => {
    if(sortBy === key) {
      setSortDirection((old: SortDirection) => old === 'asc'? 'desc' : 'asc');
    } else {
      setSortDirection('asc');
    };

    setSortBy(key as keyof User);
  }, [setSortBy, setSortDirection, sortBy]);

  const onDelete = useCallback((user: User) => {
    requestConfirm({
      message: `Are you sure you want to delete ${user.name} ?`,
      onConfirm: () => {
        deleteUser(user.id);
      },
    })
  }, [deleteUser, requestConfirm]);

  const handleSave = (newUser: User) => {
    if(newUser.id) {
      updateUser({user: newUser, callback: () => setUserToEdit(undefined)});
    } else {
      createUser({user: newUser, callback: () => setFormOpen(false)});
    }
  }

  return (
    <Card 
      title="Users" 
      action={<Button variant="contained" color="primary" onClick={() =>setFormOpen(true)} disabled={isFormOpen}><Plus /> Add User</Button>} 
      fullWidth
      collapsibleItems={<AddUserForm onSave={handleSave} onCancel={() => setFormOpen(false)} isSaving={isCreating}/>}
      open={isFormOpen}
    >
      <UserTable>
        <TableHead>
          <TableRow>
            <SortableHeader identifier="name" label="Name" onSort={handleSort} sorted={sortBy === 'name'} order={sortDirection}/>
            <SortableHeader identifier="email" label="Email" onSort={handleSort} sorted={sortBy === 'email'} order={sortDirection}/>
            <SortableHeader identifier="role" label="Role" onSort={handleSort} sorted={sortBy === 'role'} order={sortDirection}/>
            <ActionsCell />
          </TableRow>
        </TableHead>
        {isFetching ? (
          <TableBody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <TableRow key={`loading_row_${idx}`}>
                <TableCell><Skeleton width="5rem" height="2rem" /></TableCell>
                <TableCell><Skeleton width="5rem" height="2rem" /></TableCell>
                <TableCell><Skeleton width="5rem" height="2rem" /></TableCell>
                <ActionsCell />
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                {
                    userToEdit?.id === user.id  
                    ? (
                      <EditRow value={userToEdit} onCancel={() => setUserToEdit(undefined)} onSave={handleSave} isSaving={isSaving}/>
                    ): (
                      <>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <ActionsCell>
                          <IconButton onClick={() => setUserToEdit(user)} disabled={isSaving || isDeleting}><Edit2 /></IconButton>
                          <IconButton onClick={() => onDelete(user)} disabled={isSaving || isDeleting}><Trash /></IconButton>
                        </ActionsCell>
                      </>
                    )
                  }

              </TableRow>
            ))}
          </TableBody>
        )}
      </UserTable>
    </Card>
  );
};

export default Users;