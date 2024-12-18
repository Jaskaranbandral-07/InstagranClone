import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './Navbar.css';

function Navbar() {
    const { user } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="navbar__content">
                <Link to="/" className="navbar__logo">
                    <img src="/instagram-logo.png" alt="Instagram" />
                </Link>
                
                <div className="navbar__search">
                    <input type="text" placeholder="Search" />
                </div>

                <div className="navbar__icons">
                    <Link to="/">
                        <HomeIcon />
                    </Link>
                    <AddBoxOutlinedIcon />
                    <ExploreOutlinedIcon />
                    <FavoriteBorderIcon />
                    <Link to={`/profile/${user?.username}`}>
                        <img 
                            src={user?.profilePic || "/default-avatar.png"} 
                            alt="Profile"
                            className="navbar__avatar"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar; 