
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import { RegisterSchema, type RegisterData } from '../schemas/auth-schemas';
import type z from 'zod';
import { registerUser } from '../api/auth-api';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import type { RegisterFormData } from '../types/auth.types';
import { Box } from '@mui/system';

type RegisterFormProps = {
    onSubmit: (data: RegisterFormData) => void
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
    const whiteInputStyle = {
        input: { color: '#fff' },
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#fff' },
            '&:hover fieldset': { borderColor: '#fff' },
            '&.Mui-focused fieldset': { borderColor: '#fff' },
        },
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        resolver: zodResolver(RegisterSchema),
    });
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: '#1d2022' }}>
                <Typography sx={{ color: '#ffffff' }}>Register</Typography>
                <br />
                
                <TextField type='text' size='small'  variant="outlined"
                    {...register('username')} sx={{
  input: {
    color: '#fff',
  },

  '& .MuiOutlinedInput-root': {
    backgroundColor: 'transparent', 

    '& fieldset': {
      borderColor: '#ffffff',
    },

    '&:hover fieldset': {
      borderColor: '#ffffff',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#12300a',
    },
  },

  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px #1d2022 inset',
    WebkitTextFillColor: '#fff',
  },
}}
                />                    {errors.username && <p>{errors.username.message}</p>}
                <InputLabel sx={{ color: '#ffffff' }}>Email</InputLabel>
                <TextField type='email' size='small' sx={{ color: '#ffffff', input: { color: '#fff' } }} {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
                <InputLabel sx={{ color: '#ffffff', borderColor: '#ffffff', borderWidth: '2px' }}>Password</InputLabel>
                <TextField type='password' size='small'  {...register('password')} sx={{ color: '#ffffff', input: { color: '#fff' }, }} />
                {errors.password && <p>{errors.password.message}</p>}
                <br />
                <Button type='submit' sx={{ color: '#cac6c6' }}>Register</Button>
            </form>
        </>
    )
}