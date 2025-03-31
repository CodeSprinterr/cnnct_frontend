import styles from "../styles/MeetingCard.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoCopy } from "react-icons/go";
import { CiEdit } from "react-icons/ci";


const MeetingCard = ({ title, date, timeRange, isActive, link, duration, onCopy, onEdit, onToggle, onDelete }) => {
    
    return (
        <div className={`${styles.meetingCard} ${isActive ? styles.active : styles.inactive}`}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
                <h3 className={styles.meetingTitle}>{title}</h3>
                <CiEdit className={styles.editIcon} onClick={onEdit}/>
            </div>

            {/* Date and Time */}
            <div className={styles.meetingTime}>
                <p className={styles.meetingDate}>{date}</p>
                <p className={`${styles.meetingDuration} ${isActive ? styles.activeTime : styles.inactiveTime}`}>
                    {timeRange}
                </p>
                <p className={styles.meetingType}>{duration}, Group meeting</p>
            </div>
            <div className={styles.separator}></div>

            {/* Card Footer */}
            <div className={styles.cardFooter}>
                <label className={styles.switch}>
                    <input type="checkbox" checked={isActive} onChange={onToggle} />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
                <GoCopy className={styles.deleteIcon} onClick={() => { navigator.clipboard.writeText(link); onCopy(); }} />
                <FaRegTrashAlt className={styles.deleteIcon} onClick={onDelete} />
            </div>
        </div>
    );
};

export default MeetingCard;
