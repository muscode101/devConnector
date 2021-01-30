import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import Spinner from "../Spinner";
import {getPosts} from "../../actions/post";
import {connect} from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";


const Posts = ({getPosts, post: {posts, loading}}) => {
    useEffect(() =>
            getPosts(),
        [getPosts]
    )

    return loading ? <Spinner/> : (
        <Fragment>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'/> Welcome to the community
            </p>
            <PostForm/>
            <div className='posts'>
                { posts && posts?.map(post =>{
                    return <PostItem key={post._id} post={post}/>}
                )}
            </div>
        </Fragment>
    )
}

function isEmpty(value) {
    return (value == null || value === '');
}

Posts.prototype = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

export default connect(state => ({post: state.post}), {getPosts})(Posts)