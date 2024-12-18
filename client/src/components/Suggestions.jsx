import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Suggestions.css';

function Suggestions() {
    const [suggestions, setSuggestions] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/suggestions');
                setSuggestions(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSuggestions();
    }, []);

    const handleFollow = async (userId) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${userId}/follow`);
            setSuggestions(suggestions.filter(suggestion => suggestion._id !== userId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="suggestions">
            <div className="suggestions__header">
                <div className="suggestions__headerLeft">
                    <img src={user?.profilePic} alt={user?.username} />
                    <div className="suggestions__headerInfo">
                        <h4>{user?.username}</h4>
                        <p>{user?.fullName}</p>
                    </div>
                </div>
                <button>Switch</button>
            </div>

            <div className="suggestions__title">
                <h4>Suggestions For You</h4>
                <button>See All</button>
            </div>

            {suggestions.map((suggestion) => (
                <div key={suggestion._id} className="suggestions__user">
                    <div className="suggestions__userInfo">
                        <img src={suggestion.profilePic} alt={suggestion.username} />
                        <div>
                            <h4>{suggestion.username}</h4>
                            <p>Suggested for you</p>
                        </div>
                    </div>
                    <button onClick={() => handleFollow(suggestion._id)}>
                        Follow
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Suggestions; 