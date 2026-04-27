
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import { RegisterSchema } from '../schemas/auth-schemas';
import type z from 'zod';
import { registerUser } from '../api/auth-api';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export const RegisterForm: React.FC = () => {
    type RegisterData = z.infer<typeof RegisterSchema>;
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: zodResolver(RegisterSchema),
    });
    const onSubmit = async (data: RegisterData) => {
        setError('');
        try {
            await registerUser(data)
        }
        catch (err: unknown) {
            if (axios.isAxiosError(err)) {                
                const message = err.response?.data?.message || err.message;
                const status = err.response?.status;
                setError(message);
            } else {
                setError("Something went wrong");
            }
        }
    };




    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography>Register</Typography>
                <InputLabel>username</InputLabel>
                <TextField type='text' size='small' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  {...register('username')} />
                {errors.username && <p>{errors.username.message}</p>}
                <InputLabel>email</InputLabel>
                <TextField type='text' size='small' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
                <InputLabel>password</InputLabel>
                <TextField type='password' size='small' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}   {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}
                <p color='red'>{error}</p>

                <Button type='submit' variant="contained">SUBMIT</Button>

            </form>

        </>
    )
}