import React, {Fragment, useState} from "react"
import {Link, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {login} from "../../actions/auth";

const Login = ({setAlert, login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        login(email, password)
        console.log("Success")
    }

    if (isAuthenticated) {
        return <Redirect to="./dashboard"/>
    }

    return <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"/> Sign into Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email} onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password} onChange={e => onChange(e)}
                    required
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login"/>
        </form>
        <p className="my-1">
            don't have an account? <Link to="/auth">Sign Up</Link>
        </p>
    </Fragment>
}

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {setAlert, login})(Login)