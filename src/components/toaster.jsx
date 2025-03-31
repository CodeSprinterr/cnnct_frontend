import { useState, useEffect } from "react";
import styles from "../styles/toaster.module.css";
import successIcon from "../assets/check_circle.svg";
import warningIcon  from "../assets/warning.svg";
const Toaster = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);

    const icon = type === "success" ? successIcon : warningIcon;
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div className={`${styles.toaster} ${type === "success" ? styles.success : styles.error}`}>
            <img src={icon} alt={type} className={styles.icon} />
            <span className={styles.message}>{message}</span>
            <span>|</span>
            <button className={styles.closeBtn} onClick={() => setVisible(false)}>✖</button>
        </div>
    );
};

export default Toaster;
