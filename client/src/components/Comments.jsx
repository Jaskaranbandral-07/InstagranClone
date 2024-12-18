import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Comments.css';

function Comments({ postId, comments, setComments }) {
    const [newComment, setNewComment] = useState('');
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const res = await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, {
                text: newComment
            });
            setComments([...comments, res.data]);
            setNewComment('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="comments">
            <div className="comments__list">
                {comments.map((comment) => (
                    <div key={comment._id} className="comment">
                        <span className="comment__username">
                            {comment.user.username}
                        </span>
                        <span className="comment__text">{comment.text}</span>
                    </div>
                ))}
            </div>

            <form className="comments__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button 
                    type="submit"
                    disabled={!newComment.trim()}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

export default Comments; 