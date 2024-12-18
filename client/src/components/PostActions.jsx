import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './PostActions.css';

function PostActions({ post, onLikeUpdate }) {
    const { user } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id));
    const [isSaved, setIsSaved] = useState(post.saves?.includes(user?._id));

    const handleLike = async () => {
        try {
            await axios.put(`http://localhost:5000/api/posts/${post._id}/like`);
            setIsLiked(!isLiked);
            onLikeUpdate(isLiked ? -1 : 1);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/posts/${post._id}/save`);
            setIsSaved(!isSaved);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="postActions">
            <div className="postActions__left">
                <button 
                    className={`postActions__button ${isLiked ? 'active' : ''}`} 
                    onClick={handleLike}
                >
                    {isLiked ? '❤️' : '🤍'}
                </button>
                <button className="postActions__button">
                    💬
                </button>
            </div>
            
            <button 
                className={`postActions__button ${isSaved ? 'active' : ''}`}
                onClick={handleSave}
            >
                {isSaved ? '📥' : '📤'}
            </button>
        </div>
    );
}

export default PostActions; 