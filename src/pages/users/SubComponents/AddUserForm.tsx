import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from "@mui/material";
import Loader from "components/Loader";
import { FC, FormEvent, useCallback, useState } from "react";
import { User } from "src/models/Users";

interface AddUserFormProps {
  onSave?: (user: User) => void;
  onCancel?: () => void;
  isSaving?: boolean;
}

const AddUserForm : FC<AddUserFormProps> = ({ onSave, onCancel, isSaving }) => {
  const [user, setUser] = useState<User>({
    role: 'User'
  } as User);

  const handleChange = useCallback((key: keyof User, value: string) => {
    setUser((old) => ({
      ...(old || {}) as User,
      [key]: value,
    }))
  }, []);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!user) return;

    onSave?.(user);
  }

  return (
    <form onSubmit={handleSave}>
      <Stack direction="column" gap="1.5rem">
        <TextField label="Name" value={user?.name} size="small" onChange={(e) => handleChange('name', e.target.value)} disabled={isSaving} fullWidth/>
        <TextField label="Email" value={user?.email} type="email" size="small" onChange={(e) => handleChange('email', e.target.value)} disabled={isSaving} fullWidth/>
        <FormControl fullWidth>
          <InputLabel id="role">
            Role
          </InputLabel>
          <Select 
            labelId="role" 
            size="small" 
            value={user?.role ?? ''}
            input={<OutlinedInput label="Role" />}
            onChange={(e) => handleChange('role', e.target.value)} 
            disabled={isSaving} 
            fullWidth
            >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" gap=".5rem" justifyContent="end">
          <Button variant="outlined" disabled={isSaving} onClick={() => onCancel?.()}>Cancel</Button>
          <Button variant="contained" type="submit" disabled={isSaving || Object.keys(user).length !== 3}>{isSaving ? <Loader/> : null } Save</Button>
        </Stack>
      </Stack>
    </form>
  )
};

export default AddUserForm;