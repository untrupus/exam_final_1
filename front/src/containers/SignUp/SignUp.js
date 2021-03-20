import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {registerUser} from "../../store/actions/usersActions";
import './SignUp.css';

const SignUp = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        displayName: '',
        avatarImage: ''
    });

    const dispatch = useDispatch();

    const inputChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const formSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(state));
    };


    return (
        <div className='signUpPageInner'>
            <div className='signUpBlock'>
                <h3>Sign Up</h3>
                <input
                    type='text'
                    name='email'
                    className='signUpField'
                    value={state.email}
                    onChange={inputChangeHandler}
                    placeholder='Email'
                />
                <input
                    type='text'
                    name="displayName"
                    className='signUpField'
                    value={state.displayName}
                    onChange={inputChangeHandler}
                    placeholder='Display Name'
                />
                <input
                    className='signUpField'
                    name="password"
                    type="password"
                    value={state.password}
                    onChange={inputChangeHandler}
                    placeholder='Password'
                />
                <button
                    type='button'
                    className='signBtn'
                    onClick={formSubmit}
                >
                    Sign In
                </button>
                <Link to="/signin">
                    Already have an account? Sign In
                </Link>
            </div>
        </div>

    );
}

export default SignUp;