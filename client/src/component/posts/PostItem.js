import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {addLike, deletePost, removeLike} from "../../actions/post";
import Avatar from "@material-ui/core/Avatar";

const PostItem = ({auth, addLike, removeLike, deletePost, post: {_id, text, name, avater, user, likes, comments, date}, showActions = true}) =>
    <div className="posts">
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to="profile">
                    <Avatar src={avater} className='round-img' style={{
                        width: '100px',
                        height: '100px',
                        marginLeft: '25%'
                    }}/>
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                {
                    showActions && (
                        <Fragment>
                            <button onClick={() => addLike(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-thumbs-up"/>
                                {likes.length > 0 && (
                                    <span>{likes.length}</span>)}
                            </button>
                            <button onClick={() => removeLike(_id)} type="button" className="btn btn-light">
                                <i className="fas fa-thumbs-down"/>
                            </button>
                            <Link to={`/post/${_id}`} className="btn btn-primary">
                                Discussion {comments.length > 0 && (
                                <span className='comment-count'>{comments.length}</span>)}
                            </Link>

                            {
                                !auth.loading && user === auth.user._id && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => deletePost(_id)}
                                    >
                                        <i className="fas fa-times"/>
                                    </button>
                                )
                            }

                        </Fragment>
                    )
                }
            </div>
        </div>
    </div>

PostItem.prototype = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired
}

export default connect(state => ({auth: state.auth}), {addLike, removeLike, deletePost})(PostItem)