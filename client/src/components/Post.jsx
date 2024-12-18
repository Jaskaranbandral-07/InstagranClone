import React, { useState } from 'react';
import PostActions from './PostActions';
import Comments from './Comments';
import './Post.css';

function Post({ post }) {
    const [likesCount, setLikesCount] = useState(post.likes.length);
    
    const handleLikeUpdate = (change) => {
        setLikesCount(prev => prev + change);
    };

    return (
        <div className="post">
            <div className="post__header">
                <img 
                    className="post__avatar" 
                    src={post.user.profilePic} 
                    alt={post.user.username} 
                />
                <h3>{post.user.username}</h3>
            </div>

            <img className="post__image" src={post.image} alt="" />
            
            <PostActions post={post} onLikeUpdate={handleLikeUpdate} />
            
            <div className="post__likes">
                {likesCount} likes
            </div>

            <div className="post__caption">
                <strong>{post.user.username}</strong> {post.caption}
            </div>

            <Comments postId={post._id} comments={post.comments} />
        </div>
    );
}

export default Post; 