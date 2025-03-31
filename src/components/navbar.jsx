import logo from '../assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { UserContext } from '../pages/dashboard';
import styles from '../styles/navbar.module.css';
import logout from '../assets/logout.svg';

const Navbar = () => {
    const { imageBase64 } = useContext(UserContext);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/login"); 
    };

    return (
        <div className={styles.navContainer}>
            <div className={styles.navImgDiv}>
                <Link to="/">
                    <img src={logo} alt="Spark Logo" />
                </Link>
                <label>SPARK</label>
            </div>
            <div className={styles.userProfileDiv} onClick={() => setShowLogout(!showLogout)}>
                <img src={imageBase64} alt="userImg" />
                {showLogout && (
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        <img src={logout} alt="logout" />
                        <span>Sign out</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
