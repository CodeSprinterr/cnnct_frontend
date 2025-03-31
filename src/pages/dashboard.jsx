import { useState, useEffect, createContext, useMemo   } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../layout/sidebar';
import styles from '../styles/dashboard.module.css';
import { fetchUser } from '../services'
import { bufferToBase64 } from '../utils/imageutils';
import profile from '../assets/profile.png';
import Navbar from '../components/navbar';

export const UserContext = createContext(null);

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/events");
    }
  }, [location.pathname, navigate]);

  const getUser = async () => {
    try {
      const response = await fetchUser(); 
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error(error); 
    }
  };

  const imageBase64 = useMemo(() => {
    return user?.image?.data
      ? `data:${user.image.contentType};base64,${bufferToBase64(user.image.data.data)}`
      : profile; 
  }, [user]);




  
    

  return (
    <UserContext.Provider value={{ user, setUser, imageBase64 }}>
      <div className={styles.dashboard}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <Sidebar currentPath={location.pathname} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Dashboard;
