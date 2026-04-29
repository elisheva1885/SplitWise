import {Link} from 'react-router-dom'
import { useUserContext } from "../store/use-user.context";
export const Navbar = () => {
    const { user } = useUserContext();
console.log("in the navbar", user);

    return (
        <>
        <nav>
            <Link to="/">Home</Link> 
            <Link to="/user">User</Link> 
            <Link to="/group">Group</Link> 
        </nav >
                {user? user.username: <></>}

        </>
            )
}