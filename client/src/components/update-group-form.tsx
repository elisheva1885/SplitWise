
import type { UserInGroup } from '../types/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateGroupMemberSchema,  type UpdateGroupMemberData } from '../schemas/group-schemas';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


type AddGroupMemberFormProps = {
    onSubmit: (member: UserInGroup) => void,
    setDialogOpen: (open: boolean) => void;
    user: UserInGroup | null
}

export const UpdateGroupMemberForm = ({ onSubmit, user}: AddGroupMemberFormProps) => {

     const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<UpdateGroupMemberData>({
        resolver: zodResolver(UpdateGroupMemberSchema),
        mode: "onChange",
      });


    return (
        <>
           <form  style={{ backgroundColor: '#405a4e' }}>
                <Typography sx={{ color: 'white' }}>Register</Typography>
                <br />
                <InputLabel >Username</InputLabel>
                <TextField type='text' size='small' variant="outlined"
                    {...register('username')} error={!!errors.username}
                    helperText={errors.username?.message} defaultValue={user?.username}
                />
                <InputLabel >Email</InputLabel>
                <TextField type='email' size='small'  {...register('email')} error={!!errors.email}
                    helperText={errors.email?.message} defaultValue={user?.email}/>
                <br />
                <Button type='submit'>Save Changes</Button>
            </form>
        </>
    )


}