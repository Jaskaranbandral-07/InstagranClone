import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stories.css';

function Stories() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/stories');
                setStories(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchStories();
    }, []);

    return (
        <div className="stories">
            <div className="stories__container">
                {stories.map((story) => (
                    <div key={story._id} className="story">
                        <div className="story__avatar">
                            <img src={story.user.profilePic} alt={story.user.username} />
                        </div>
                        <span>{story.user.username}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Stories; 