import React, {Fragment, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {createProfile} from "../../actions/profile";
import PropTypes from 'prop-types'
import {connect} from "react-redux";

const CreateProfile = ({createProfile,history}) => {
    const [formData, setFormData] = useState({
        bio: '',
        status: '',
        skills: '',
        company: '',
        twitter: '',
        website: '',
        youtube: '',
        linkedin: '',
        facebook: '',
        location: '',
        instagram: '',
        githubusername: ''
    })

    const [displaySocialInputs, toggleSocialInputs] = useState(false)
    const {
        bio,
        status,
        skills,
        company,
        twitter,
        website,
        youtube,
        linkedin,
        facebook,
        location,
        instagram,
        githubusername
    } = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        console.log(`profile ${formData}`)
        console.log(`profile ${formData.status}`)
        createProfile({formData, history})
    }

    return <Fragment>
        <h1 className="large text-primary">
            Create Your Profile
        </h1>
        <p className="lead">
            <i className="fas fa-user"/>
            Let's get some information to make your profile stand out
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <select value={status} name="status" onChange={e => onChange(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text">
                    Give us an idea of where you are at in your career
                </small>
            </div>
            <div className="form-group">
                <input onChange={e => onChange(e)} type="text" placeholder="Company" value={company} name="company"/>
                <small className="form-text">
                    Could be your own company or one you work for
                </small>
            </div>
            <div className="form-group">
                <input onChange={e => onChange(e)} type="text" placeholder="Website" value={website} name="website"/>
                <small className="form-text">
                    Could be your own or a company website
                </small>
            </div>
            <div className="form-group">
                <input onChange={e => onChange(e)} type="text" placeholder="Location" value={location} name="location"/>
                <small className="form-text"
                >City & state suggested (eg. Boston, MA)</small>
            </div>
            <div className="form-group">
                <input onChange={e => onChange(e)} type="text" placeholder="* Skills" value={skills} name="skills"/>
                <small className="form-text">
                    Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)
                </small>
            </div>
            <div className="form-group">
                <input
                    onChange={e => onChange(e)}
                    type="text"
                    value={githubusername}
                    placeholder="Github Username"
                    name="githubusername"
                />
                <small className="form-text"
                >If you want your latest repos and a Github link, include your
                    username</small
                >
            </div>
            <div className="form-group">
                <textarea onChange={e => onChange(e)} placeholder="A short bio of yourself" value={bio} name="bio"/>
                <small className="form-text">Tell us a little about yourself</small>
            </div>

            <div className="my-2">
                <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
            </div>

            {displaySocialInputs &&
            <Fragment>
                <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"/>
                    <input onChange={e => onChange(e)} type="text" placeholder="Twitter URL" value={twitter}
                           name="twitter"/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"/>
                    <input onChange={e => onChange(e)} type="text" placeholder="Facebook URL" value={facebook}
                           name="facebook"/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"/>
                    <input onChange={e => onChange(e)} type="text" placeholder="YouTube URL" value={youtube}
                           name="youtube"/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"/>
                    <input onChange={e => onChange(e)} type="text" placeholder="Linkedin URL" value={linkedin}
                           name="linkedin"/>
                </div>

                <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"/>
                    <input onChange={e => onChange(e)} type="text" placeholder="Instagram URL" value={instagram}
                           name="instagram"/>
                </div>
            </Fragment>
            }

            <input onChange={e => onChange(e)} type="submit" className="btn btn-primary my-1"/>
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
    </Fragment>
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(null, {createProfile})(withRouter(CreateProfile))