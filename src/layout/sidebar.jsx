import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/sidebar.module.css';
import logo from '../assets/logo.svg';
import event from '../assets/event.svg';
import booking from '../assets/booking.svg';
import available from '../assets/availiblity.svg';
import settings from '../assets/setting.svg';
import { UserContext } from '../pages/dashboard';
import { useContext, useState } from 'react';
import logout from '../assets/logout.svg';
import { IoAddSharp } from "react-icons/io5";


const Sidebar = ({ currentPath }) => {
    const { user, imageBase64 } = useContext(UserContext);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const options = [
        { logo: event, name: 'Events', link: '/dashboard/events' },
        { logo: booking, name: 'Booking', link: '/dashboard/booking' },
        { logo: available, name: 'Availability', link: '/dashboard/availabilty' },
        { logo: settings, name: 'Settings', link: '/dashboard/settings' }
    ];

    return (
        <div className={styles.sidebar}>
            <Link to="/" ><div className={styles.logoContainer}>

                <img src={logo} alt="logo" className={styles.logo} />
                <h2>CNNCT</h2>

            </div></Link>

            {/* Menu options */}
            <ul className={styles.menu}>
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={`${styles.option} ${currentPath === option.link ? styles.active : ''}`}
                    >
                        <Link to={option.link}>
                            <img src={option.logo} alt={option.name} className={styles.optionIcon} />
                            <span>{option.name}</span>
                        </Link>
                    </li>
                ))}
                <li > 
                    <Link to='/dashboard/create'>
                        <button className={`${styles.createNewButton} ${currentPath === '/dashboard/create' ? styles.changeCreateBg : ''}`}>
                            <IoAddSharp className={styles.addIcon} />
                            <span>Create</span>
                            
                        </button>
                    </Link>
                </li>
            </ul>

            <div className={styles.profile} onClick={() => setShowLogout(!showLogout)}>
                <div><img src={imageBase64} alt="dp" className={styles.dp} /></div>

                {user ? (
                    <span>{user.firstName} {user.lastName}</span>
                ) : (
                    <span>Guest</span>
                )}

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

export default Sidebar;
