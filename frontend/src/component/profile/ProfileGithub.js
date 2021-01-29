import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Spinner from "../Spinner";

const ProfileGithub = ({username, getGithubRepos, repos}) => {
    useEffect(() =>
        getGithubRepos(), [getGithubRepos])

    return (
        <div className='profile-github'>
            <h2 className='text-primary my-1'>Github Repos</h2>
            {
                repos === null ? <Spinner/> : (
                    repos.map(repo =>
                        <div key={repo._id} className='repo bg-white p-1 my-1'>
                            <div>
                                <h4>
                                    <a
                                        href={repo.html_url}
                                        target='_blank'
                                        rel='noopener noreferrer'>{repo.name}</a>
                                </h4>
                                <p>{repo.description}</p>
                            </div>
                            <div>
                                <ul>
                                    <li className='badge badge-primary'>
                                        Stars: {repos.stargazers_count }
                                    </li>
                                    <li className='badge badge-dark'>
                                        watchers: {repos.watchers_count }
                                    </li>
                                    <li className='badge badge-light'>
                                        forks: {repos.forks_count }
                                    </li>
                                </ul>
                            </div>

                        </div>
                    )
                )
            }
        </div>
    )
}

ProfileGithub.prototype = {
    username: PropTypes.object.isRequired,
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.object.isRequired
}

export default connect()(ProfileGithub)