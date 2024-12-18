import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import Stories from '../components/Stories';
import Suggestions from '../components/Suggestions';
import axios from 'axios';
import './Home.css';

function Home() {
    const [posts, setPosts] = useState([
        // Add some mock data for testing
        {
            _id: '1',
            user: {
                _id: '1',
                username: 'testuser',
                profilePic: 'https://via.placeholder.com/150'
            },
            image: 'https://via.placeholder.com/600',
            caption: 'Test post',
            likes: [],
            saves: [],
            comments: []
        }
        // Add more mock posts as needed
    ]);

    // Uncomment this when your backend is ready
    /*
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts/timeline');
                setPosts(res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                }));
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);
    */

    return (
        <div className="home">
            <div className="home__left">
                <Stories />
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
            <div className="home__right">
                <Suggestions />
            </div>
        </div>
    );
}

export default Home; 