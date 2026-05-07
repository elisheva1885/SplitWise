
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { AddGroupSchema, type AddGroupData } from '../schemas/group-schemas';
import { zodResolver } from '@hookform/resolvers/zod';

type AddGroupFormProps = {
    onSubmit: (data: AddGroupData) => void,
}

export const AddGroupForm = ({ onSubmit }: AddGroupFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddGroupData>({
        resolver: zodResolver(AddGroupSchema),
          mode: 'onChange',
    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: '#2e3136' }}>
                <Typography sx={{ color: 'white' }}>Login</Typography>
                <InputLabel>Group Name</InputLabel>
                <TextField type='text' size='small'  {...register('name')} error={!!errors.name}
                    helperText={errors.name?.message} />
                <InputLabel>Description</InputLabel>
                <TextField type='text' size='medium'  {...register('description')} error={!!errors.description}
                    helperText={errors.description?.message} />
                <br />
                <Button type='submit'>Add</Button>
            </form>

        </>
    )


}