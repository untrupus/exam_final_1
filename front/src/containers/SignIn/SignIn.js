import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {Link} from "react-router-dom";

import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";
import {loginUser} from "../../store/actions/usersActions";


const SignIn = () => {
    const [state, setState] = useState({
        email: '',
        password: ''
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
        dispatch(loginUser({...state}));
    };

    return (
        <div>
            <div className='signUpPageInner'>
                <div className='signUpBlock'>
                    <h3>Sign In</h3>
                    <input
                        type='text'
                        name='email'
                        className='signUpField'
                        value={state.email}
                        onChange={inputChangeHandler}
                        placeholder='Email'
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
                    <FacebookLogin/>
                    <Link to="/signup">
                        Or sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;

