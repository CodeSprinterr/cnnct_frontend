import styles from "../styles/showEvent.module.css";
import { useState } from "react";
import { MdBlockFlipped } from "react-icons/md";
import { GoCheck } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { updateBookingStatus } from "../services";
import { FaRegCircleUser } from "react-icons/fa6";

const ShowEvent = ({ event, onStatusChange }) => {
  const [showParticipants, setShowParticipants] = useState(false);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate().toString().padStart(2, "0"); // Ensures two-digit day
    const month = date.toLocaleDateString("en-US", { month: "short" });

    return `${weekday}, ${day} ${month}`;
  };

  const formatTime = (time, period, duration) => {
    // Extract duration in minutes (convert "1 hour" -> 60, "30 mins" -> 30, etc.)
    let durationInMinutes = parseInt(duration) * (duration.includes("hour") ? 60 : 1);

    // Parse the start time
    let [hour, minute] = time.split(":").map(Number);

    // Convert to 24-hour format if necessary
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    // Create a Date object for the start time
    let startTime = new Date();
    startTime.setHours(hour, minute, 0);

    // Create the end time by adding the duration
    let endTime = new Date(startTime.getTime() + durationInMinutes * 60000);

    // Format both times in 12-hour format
    const format12Hour = (date) => {
      let hours = date.getHours();
      let mins = date.getMinutes().toString().padStart(2, "0");
      let amPm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12; // Convert 0 (midnight) or 12+ to 12-hour format
      return `${hours}:${mins} ${amPm}`;
    };

    return `${format12Hour(startTime)} - ${format12Hour(endTime)}`;
  };

  const handleResponse = async (newStatus) => {
    try {
      console.log(event.myParticipantId);
      const response = await updateBookingStatus(event.myParticipantId, newStatus);
      const data = await response.json();

      if (data.success) {
        onStatusChange();
      } else {
        console.error("Failed to update event status:", data.message);
      }
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventDetails}>
        <div >
          <p className={styles.eventDate}>{formatDate(event.date)}</p>
          <p className={styles.eventTime}>{formatTime(event.time, event.period, event.duration)}</p>
        </div>
        <div>
          <p className={styles.eventTitle}>{event.topic}</p>
          <p className={styles.eventParticipants}>
            You and {event.totalParticipants} other {event.totalParticipants > 2 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className={styles.eventActions}>
        {event.status === "Pending" ? (
          <div className={styles.buttonSection}>
            <button className={styles.btn + ' ' + styles.rejectBtn} onClick={() => handleResponse("Rejected")}>
              <MdBlockFlipped style={{ fontSize: '16px' }} /> Reject
            </button>
            <button className={styles.btn + ' ' + styles.acceptBtn} onClick={() => handleResponse("Accepted")}>
              <GoCheck style={{ fontSize: '16px' }} />Accept
            </button>

          </div>
        ) : (
          <span className={`${styles.statusTag} ${event.status === "Accepted" ? styles.accepted : styles.rejected}`}>
            {event.status}
          </span>
        )}
        {event.status !== "Rejected" && (
          <div
            className={styles.participantContainer}
            onMouseEnter={() => setShowParticipants(true)}
            onMouseLeave={() => setShowParticipants(false)}
            onClick={() => setShowParticipants(!showParticipants)}
          >
            <div className={styles.participantIcon}>
              <LuUsers /> {event.totalParticipants} people
            </div>

            {/* Participant List - Appears on Hover or Click */}
            {showParticipants && (
              <div className={styles.participantList}>
                <p><span style={{fontWeight: '700' , fontSize: '18px', lineHeight: '32px'}}>Participant</span><span>({event.totalParticipants})</span></p>
                {event.participants.map((participant, index) => (
                  <div key={index} className={styles.participantItem}>
                    <FaRegCircleUser className={styles.avatar} />
                    <span>{participant.name}</span>
                    <input
                      type="checkbox"
                      className={styles.particpantsCheckbox}
                      checked={participant.status === "Accepted"}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowEvent;
