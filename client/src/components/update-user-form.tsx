
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserContext } from '../store/use-user.context';
import { UpdateUserSchema, type UpdateUserSchemaData } from '../schemas/user.schema';
import DeleteIcon from '@mui/icons-material/Delete';
import type { UpdateUserDto } from '../types/user.types';
import { Box } from '@mui/material';

type UpdateUserFormProps = {
    onSubmit: (data: UpdateUserDto) => void,
    handleDeleteUser: () => void

}
export const UpdateUserForm = ({ onSubmit, handleDeleteUser }: UpdateUserFormProps) => {
    const { user } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateUserSchemaData>({
        resolver: zodResolver(UpdateUserSchema),
        mode: 'onChange',

    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: '#405a4e', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <Typography sx={{ color: 'white' }}>Register</Typography>
                <br />
                <InputLabel >Username</InputLabel>
                <TextField type='text' size='small' variant="outlined"
                    {...register('username')} error={!!errors.username}
                    helperText={errors.username?.message} defaultValue={user?.username}
                />
                <InputLabel >Email</InputLabel>
                <TextField type='email' size='small'  {...register('email')} error={!!errors.email}
                    helperText={errors.email?.message} defaultValue={user?.email} />
                <br />
                <Box sx={{display: 'flex'}}>
                    <Button type='submit' >Save Changes</Button>
                    <DeleteIcon onClick={handleDeleteUser} />
                </Box>
            </form>
        </>
    )
}