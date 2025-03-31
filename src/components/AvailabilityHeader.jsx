import { useState, useEffect } from 'react';
import styles from '../styles/analytics.module.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import moment from 'moment-timezone';

const AvailabilityHeader = () => {

    const [timezone, setTimezone] = useState("");

    useEffect(() => {
        const date = new Date();
        const userTimeZone = Intl.DateTimeFormat('en-US', { timeZoneName: 'long' }).formatToParts(date);
        const timeZoneName = userTimeZone.find(part => part.type === "timeZoneName")?.value;
        setTimezone(timeZoneName || "Unknown Timezone");
    }, []);

    return (
        <div className={styles.AvailabilityHeader}>
            <div className={styles.ah1}>
                <h4>Activity</h4>
                <p>Event Type <RiArrowDropDownLine /></p>
            </div>
            <div className={styles.ah2}>
                <h4>Time Zone</h4>
                <p>{timezone} <RiArrowDropDownLine /></p>
            </div>
        </div>
    )
}

export default AvailabilityHeader
