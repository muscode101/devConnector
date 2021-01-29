import React from 'react'
import PropTypes from 'prop-types'


const ProfileTop = (
    {
        profile: {
            bio,
            skills,
            user: {name}
        }
    }
) => {

    return (
        <div className="profile-about bg-light p-2">
            <h2 className="text-primary">{name.trim().split(' ')[0]}</h2>
            <p>
                {bio && <span>{bio}</span>}
            </p>
            <div className="line"/>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skills.map((skill,index) =>
                    <div key={index} className='p-1'>
                        <i className='fas fa-check'/>{skill}
                    </div>
                )}
            </div>
        </div>
    )
}

ProfileTop.prototype = {
    Profile: PropTypes.object.isRequired
}

export default ProfileTop