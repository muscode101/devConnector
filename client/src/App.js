import './App.css';
import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import React, {Fragment, useEffect} from "react"
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import {Provider} from "react-redux";
import store from "./store";
import Alert from "./component/layout/Alert";
import {loadUser} from "./actions/auth";
import setAuthToken from "./util/setAuthToken";
import Dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./component/routes/PrivateRoute";
import CreateProfile from "./component/profile-forms/CreateProfile";
import EditProfile from "./component/profile-forms/EditProfile";
import AddEducation from "./component/profile-forms/AddEducation";
import AddExperience from "./component/profile-forms/AddExperience";
import Profiles from "./component/profiles/Profiles";
import Profile from "./component/profile/Profile";
import Posts from "./component/posts/Posts";
import Post from "./component/post/Post";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}


const App = () => {
    useEffect(() => {
        store.dispatch(loadUser())
    }, [])
    return (
        <Provider store={store}>
            <Fragment>
                <Router>
                    <Navbar/>
                    <Route exact path="/" component={Landing}/>
                    <section className="container">
                        <Alert/>
                        <Switch>
                            <Route exact path="/auth" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/profiles" component={Profiles}/>
                            <Route exact path="/profile/:id" component={Profile}/>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                            <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                            <PrivateRoute exact path="/add-education" component={AddEducation}/>
                            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                            <PrivateRoute exact path="/posts" component={Posts}/>
                            <PrivateRoute exact path="/post/:id" component={Post}/>

                        </Switch>
                    </section>
                </Router>
            </Fragment>
        </Provider>
    );
}

export default App;
