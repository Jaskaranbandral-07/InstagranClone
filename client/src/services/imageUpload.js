import axios from 'axios';

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_cloudinary_upload_preset'); // Replace with your Cloudinary upload preset

    try {
        const res = await axios.post(
            'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // Replace with your Cloudinary cloud name
            formData
        );
        return res.data.secure_url;
    } catch (err) {
        console.error('Error uploading image:', err);
        throw err;
    }
};

export default uploadImage; 