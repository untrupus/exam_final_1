import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./containers/MainPage/MainPage";
import SignUp from "./containers/SignUp/SignUp";
import SignIn from "./containers/SignIn/SignIn";
import AddShelter from "./containers/AddShelter/AddShelter";
import SingleShelter from "./containers/SingleShelter/SingleShelter";


import {useSelector} from "react-redux";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/signin"/>
};
const ProtectedSignRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/"/>
};

function App() {
    const user = useSelector(state => state.users.user);
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Route path="/shelters/:id" exact component={SingleShelter}/>
                <ProtectedSignRoute
                    path="/signup"
                    exact
                    component={SignUp}
                    isAllowed={!user}
                />
                <ProtectedSignRoute
                    path="/signin"
                    exact
                    component={SignIn}
                    isAllowed={!user}
                />

                <ProtectedRoute
                    path="/addshelter"
                    exact
                    component={AddShelter}
                    isAllowed={user}
                />

                <Route render={() => <h1>404</h1>}/>
            </Switch>
        </div>
    );
}

export default App;