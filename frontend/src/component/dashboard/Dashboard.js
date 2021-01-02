import React, {Fragment, useEffect} from "react"
import {deleteAccount, getProfile} from "../../actions/profile";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Spinner from "../Spinner";
import DashboardActions from "./DashboardActions";
import {Link} from "react-router-dom";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = ({getProfile, deleteAccount, auth: {user}, profile: {profile, loading, error}}) => {

    useEffect(() =>
        getProfile()
    , [])

    const showDashBoardActions = () => {
        if (profile) {
            return <Fragment>
                <DashboardActions/>
                { <Education education={profile.education}/>}
                {<Experience experience={profile.experience}/>}
                <div className='my-2'>
                    <button className='btn btn-danger' onClick={() => deleteAccount()}>
                        <i className='fas fa-user-minus'/>
                        Delete My Account
                    </button>

                </div>
            </Fragment>
        } else {
            return <Fragment>
                <p>You have not created a profile yet</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
            </Fragment>
        }

    }


    return loading && profile === null ?
        <Spinner/> :
        <Fragment>
            <h1 className='large text-primary'>DashBoard</h1>
            <p className='lead'>
                <i className='fas fa-user'/> Welcome {user && user.name}
            </p>

            {showDashBoardActions()}


        </Fragment>
}

Dashboard.propTypes = {
    getProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, {getProfile, deleteAccount})(Dashboard)