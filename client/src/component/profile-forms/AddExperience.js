import React, {Fragment, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {addExperience} from "../../actions/profile";
import PropTypes from 'prop-types'
import {connect} from "react-redux";

const AddExperience = ({addExperience, history}) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        to: '',
        from: '',
        current: false
    })

   const {current} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        addExperience({formData, history})
    }

    return <Fragment>
        <section className="container">
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"/> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" required onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" required onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} onChange={e => onChange(e)}/> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
          <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              onChange={e => onChange(e)}
          />
                </div>
                <input type="submit" className="btn btn-primary my-1" onChange={e => onChange(e)}/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </section>
    </Fragment>
}

AddExperience.propTypes = {
    AddExperience: PropTypes.func.isRequired
}

export default connect(null, {addExperience})(withRouter(AddExperience))