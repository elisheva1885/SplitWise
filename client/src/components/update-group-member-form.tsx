
import { useEffect, useState, type FormEvent } from 'react';
import type { UserInGroup } from '../types/user.types';


type AddGroupMemberFormProps = {
    onSubmit: (userId: number) => void,
    setDialogOpen: (open: boolean) => void;
    user: UserInGroup | null
}

export const UpdateGroupMemberForm = ({ onSubmit, setDialogOpen }: AddGroupMemberFormProps) => {
    const [user, setUser] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(Number(user));
        setDialogOpen(false);
    }

    useEffect(() => {
    })
    return (
        <>
           {/* <form  onSubmit={handleSubmit} style={{ backgroundColor: '#405a4e' }}>
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
            </form> */}
        </>
    )


}