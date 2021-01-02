import React, {Fragment, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {addEducation} from "../../actions/profile";
import PropTypes from 'prop-types'
import {connect} from "react-redux";

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        description: '',
        to: '',
        from: '',
        current: false
    })
    const {current} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        addEducation({formData, history})
    }

    return <Fragment>
        <section className="container">
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"/>Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        required
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        required
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy" onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" name="current" value={current} onChange={e => onChange(e)}/> Current School or
                        Bootcamp
                    </p>
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
              placeholder="Program Description"
              onChange={e => onChange(e)}
          />
                </div>
                <input type="submit" className="btn btn-primary my-1" onChange={e => onChange(e)}/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </section>
    </Fragment>
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, {addEducation})(withRouter(AddEducation))