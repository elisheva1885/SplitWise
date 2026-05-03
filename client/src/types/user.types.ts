export type User = {
    username: string;
    email: string;
}

export type UserInGroup = {
    id: number,
    username: string,
    email: string
}

export type UpdateUserDto = {
    username: string,
    email: string
}