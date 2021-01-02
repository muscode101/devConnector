import React, {Fragment} from 'react'
import Moment from "react-moment";
import {deleteExperience} from "../../actions/profile";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Experience = ({experience, deleteExperience}) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td>
                <Moment fomart='YYYY/MM/DD'>{exp.from}</Moment>-{''}
                {
                    exp.to === null ? (' Now') :
                        (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={() => deleteExperience(exp._id)} className='btn btn-danger'>Delete</button>
            </td>

        </tr>
    ))


    return (
        <Fragment>
            <h2 className='h2-2'>Experience Credentials</h2>
            <table className='table'>
                <thead>
                <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className='hide-sm'>Years</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired,
    experience: PropTypes.object.isRequired
}

export default connect(null, {deleteExperience})(Experience)