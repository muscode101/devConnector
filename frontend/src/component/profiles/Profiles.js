import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProfiles} from "../../actions/profile";
import Spinner from "../Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {

    useEffect(() =>
            getProfiles()
        , [])

    const loadProfiles = () =>
        Object.keys(profiles).length > 0 ? profiles.map(
            profile => <ProfileItem key={profile._id} profile={profile}/>
        ) : <h4>No profiles found...</h4>

    return (
        <Fragment>
            {console.log(`profiles ${profiles}`)}
            {
                loading ? <Spinner/> : (
                    <Fragment>
                        <h1 className='large text-primary'>Developers</h1>
                        <p className='lead'>
                            <i className='fab fa-connectdevelop'/>
                            Browse and connect with developers
                        </p>
                        <dev className='profiles'>
                            {loadProfiles()}
                        </dev>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)