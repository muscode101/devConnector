import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getPost} from "../../actions/post";
import PostItem from "../posts/PostItem";
import Spinner from "../Spinner";
import {Link} from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({getPost, post: {post, loading}, match}) => {

    useEffect(() =>
            getPost(match.params.id)
        , [])

    return loading || !post?._id ? <Spinner/> :
        <Fragment>
            <Link to='/posts' className='btn'>Back to Posts</Link>
            <PostItem post={post}/>
            <CommentForm postId={post?._id}/>
            {post.comments.map(comment =>
                <CommentItem comment={comment} key={comment?._id} postId={post?._id}/>)}
        </Fragment>
}

Post.prototype = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
export default connect(state => ({post: state.post}), {getPost})(Post)