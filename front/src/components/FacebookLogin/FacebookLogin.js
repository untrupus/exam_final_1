import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {fbAppId} from '../../constants';
import {useDispatch} from "react-redux";
import {facebookLogin} from "../../store/actions/usersActions";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        if (response.id) {
            dispatch(facebookLogin(response));
        }
    };

    return <FacebookLoginButton
        appId={fbAppId}
        fields="name,email,picture"
        render={renderProps => (
            <button onClick={renderProps.onClick}
                    type='button'
                    className='signBtn'
            >
                Enter with Facebook
            </button>
        )}
        callback={facebookResponse}
    />
};

export default FacebookLogin;