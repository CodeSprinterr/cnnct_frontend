import styles from '../styles/links.module.css';
import { useContext } from 'react';
import { UserContext } from '../pages/dashboard';
const heading = () => {
    const { user } = useContext(UserContext);
    
    return (
        <div className={styles.headingDiv}>
            <div className={styles.line1}>
                <h3>Hi,</h3>
                <span>{user?.firstName} {user?.lastName}!</span>
            </div>
            <span className={styles.congratsMessage}>Congraulations, You got a great response today.</span>
        </div>
    )
}

export default heading
