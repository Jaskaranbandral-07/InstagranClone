import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';
import './CreatePost.css';

function CreatePost() {
    const [postImage, setPostImage] = useState(null);
    const [caption, setCaption] = useState('');
    const { user } = useContext(AuthContext);

    const handleImageUpload = (imageUrl) => {
        setPostImage(imageUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!postImage) return;

        const formData = new FormData();
        formData.append('image', postImage);
        formData.append('caption', caption);

        try {
            await axios.post('http://localhost:5000/api/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setPostImage(null);
            setCaption('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="createPost">
            <form onSubmit={handleSubmit}>
                <div className="createPost__header">
                    <h3>Create New Post</h3>
                </div>
                
                <div className="createPost__content">
                    <ImageUpload onImageUpload={handleImageUpload} />
                    {postImage && (
                        <textarea
                            placeholder="Write a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    )}
                </div>

                {postImage && (
                    <button type="submit" className="createPost__share">
                        Share
                    </button>
                )}
            </form>
        </div>
    );
}

export default CreatePost; 