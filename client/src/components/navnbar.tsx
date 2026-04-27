import {Link} from 'react-router-dom'
export const Navbar = () => {

    return (
        <nav>
            <Link to="/">Home</Link> 
            <Link to="/user">User</Link> 
            <Link to="/group">Group</Link> 
        </nav >
            )
}