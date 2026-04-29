
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import { LoginSchema, type LoginData } from '../schemas/auth-schemas';
import type z from 'zod';
import { loginUser } from '../api/auth-api';
import { useState } from 'react';
import axios from 'axios';
import type { LoginFormData } from '../types/auth.types';

type LoginFormProps = {
    onSubmit: (data: LoginFormData)=> void
}

export const LoginForm = ({onSubmit}: LoginFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
    });

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography>Login</Typography>
                <InputLabel>username</InputLabel>
                <TextField type='text' size='small' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}  {...register('username')} />
                {errors.username && <p>{errors.username.message}</p>}
                <InputLabel>password</InputLabel>
                <TextField type='password' size='small' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}   {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}
                <Button type='submit' variant="contained">SUBMIT</Button>
            </form>

        </>
    )
}