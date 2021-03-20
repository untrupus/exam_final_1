import React from 'react';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logoutUser} from "../../store/actions/usersActions";
import './Header.css';

const Header = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className='headerInner'>
            <div className='headerLogo'>
                <Link className='logo' to="/"><h2>PLACES</h2> </Link>
            </div>
            {!user ?
                <div className='signLinks'>
                    <Link className='sign' to="/signin" id="in">Sign in </Link>
                    <span className='breadCrump'>&#160;/&#160;</span>
                    <Link className='sign' to="/signup" id="up"> Sign up</Link>
                </div> :
                <div className='signLinks'>
                    <span className='sign'>{user.user.displayName}</span>
                    <span className='breadCrump'>&#160;/&#160;</span>
                    <Link className='sign' to="/addshelter">Add Shelter</Link>
                    <span className='breadCrump'>&#160;/&#160;</span>
                    <span className='sign' onClick={logout}> Logout</span>
                </div>
            }
        </div>
    );
};

export default Header;