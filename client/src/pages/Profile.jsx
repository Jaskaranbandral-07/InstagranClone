import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userRes = await axios.get(`http://localhost:5000/api/users/${username}`);
                setUser(userRes.data);
                const postsRes = await axios.get(`http://localhost:5000/api/posts/profile/${username}`);
                setPosts(postsRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, [username]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile">
            <div className="profile__header">
                <div className="profile__avatar">
                    <img src={user.profilePic} alt={user.username} />
                </div>
                <div className="profile__info">
                    <div className="profile__infoTop">
                        <h2>{user.username}</h2>
                        <button className="profile__editButton">Edit Profile</button>
                    </div>
                    <div className="profile__infoStats">
                        <span><strong>{posts.length}</strong> posts</span>
                        <span><strong>{user.followers.length}</strong> followers</span>
                        <span><strong>{user.following.length}</strong> following</span>
                    </div>
                    <div className="profile__infoBio">
                        <h4>{user.fullName}</h4>
                        <p>{user.bio}</p>
                    </div>
                </div>
            </div>

            <div className="profile__posts">
                {posts.map((post) => (
                    <div key={post._id} className="profile__post">
                        <img src={post.image} alt="" />
                        <div className="profile__postOverlay">
                            <span>❤️ {post.likes.length}</span>
                            <span>💬 {post.comments.length}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile; 