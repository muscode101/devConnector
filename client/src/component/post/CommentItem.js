import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {removeComment} from "../../actions/post";
import Avatar from "@material-ui/core/Avatar";

const CommentItem = ({auth, removeComment, postId, comment: {_id, text, name, avater, user, date}}) =>
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${user}`}>

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
                Posted on <Moment format={'YYYY/MM/DD'}>{date}</Moment>
            </p>
            {
                !auth.loading && user === auth.user._id && (
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeComment(postId, _id)}
                    >
                        <i className="fas fa-times"/>
                    </button>
                )
            }
        </div>
    </div>

CommentItem.prototype = {
    removeComment: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
    post: PropTypes.object.isRequired,
}

export default connect(state => ({auth: state.auth}), {removeComment})(CommentItem)