import React, { useState } from 'react';
import uploadImage from '../services/imageUpload';
import './ImageUpload.css';

function ImageUpload({ onImageUpload }) {
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create preview
        setPreview(URL.createObjectURL(file));
        setLoading(true);

        try {
            const imageUrl = await uploadImage(file);
            onImageUpload(imageUrl);
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Failed to upload image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="imageUpload">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="imageInput"
                className="imageUpload__input"
            />
            <label htmlFor="imageInput" className="imageUpload__label">
                {loading ? (
                    <div className="imageUpload__loading">Uploading...</div>
                ) : preview ? (
                    <img src={preview} alt="Preview" className="imageUpload__preview" />
                ) : (
                    <div className="imageUpload__placeholder">
                        <span>Click to upload image</span>
                    </div>
                )}
            </label>
        </div>
    );
}

export default ImageUpload; 