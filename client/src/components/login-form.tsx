
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type LoginData } from '../schemas/auth-schemas';
import type { LoginFormData } from '../types/auth.types';

type LoginFormProps = {
    onSubmit: (data: LoginFormData) => void
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
        mode: 'onChange',

    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}  style={{ backgroundColor: '#2e3136' }}>
                <Typography sx={{ color: 'white' }}>Login</Typography>
                <InputLabel>username</InputLabel>
                <TextField type='text' size='small' error={!!errors.username}
                    helperText={errors.username?.message}  {...register('username')} />
                <InputLabel>password</InputLabel>
                <TextField type='password' size='small' error={!!errors.password}
                    helperText={errors.password?.message}   {...register('password')} />
                    <br/>
                <Button type='submit'>Login</Button>
            </form>

        </>
    )
}