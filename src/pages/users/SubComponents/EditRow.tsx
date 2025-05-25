import { FC, useCallback, useState } from "react";
import { IconButton, MenuItem, Select, TableCell, TextField } from "@mui/material";
import { User } from "src/models/Users";
import { ActionsCell } from "../Users.style";
import { Save, X } from "lucide-react";
import Loader from "components/Loader";

interface EditRowProps {
  value?: User;
  onCancel?: () => void;
  onSave?: (user: User) => void;
  isSaving?: boolean;
}

const EditRow: FC<EditRowProps> = ({ value, onCancel, onSave, isSaving }) => {
  const [editUser, setEditUser] = useState<User | undefined>(value);

  const handleChange = useCallback((key: keyof User, value: string) => {
    setEditUser((old) => ({
      ...(old || {}) as User,
      [key]: value,
    }))
  }, []);

  return (
    <>
      <TableCell>
        <TextField value={editUser?.name} size="small" onChange={(e) => handleChange('name', e.target.value)} fullWidth/>
      </TableCell>
      <TableCell>
        <TextField value={editUser?.email} type="email" size="small" onChange={(e) => handleChange('email', e.target.value)} fullWidth/>
      </TableCell>
      <TableCell>
        <Select size="small" value={editUser?.role} onChange={(e) => handleChange('role', e.target.value)} fullWidth>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </Select>
      </TableCell>
      <ActionsCell>
        <IconButton onClick={onCancel} disabled={isSaving}><X /></IconButton>
        <IconButton onClick={() => editUser && onSave?.(editUser)} disabled={isSaving}>{isSaving? <Loader /> : <Save />}</IconButton>
      </ActionsCell>
    </>
  );
};

export default EditRow;