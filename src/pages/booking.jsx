import linkstyles from "../styles/links.module.css";
import styles from "../styles/apperance.module.css";
import { useState, useEffect } from "react";
import Toaster from "../components/toaster";
import { myEvents } from '../services';
import ShowEvent from './../components/showEvent';

const Appearance = () => {
  const [toast, setToast] = useState({ message: "", type: "" });
  const [activeTab, setActiveTab] = useState("upcoming");
  const [meetings, setMeetings] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const response = await myEvents();
    const data = await response.json();
    // console.log(data.events)
    if (data.success) {
      setMeetings(data.events);
    }
  };
  const parseEventDateTime = (event) => {
    const { date, time, period } = event; // e.g., "2003-08-07", "04:00", "AM"
    const [hour, minute] = time.split(":").map(Number);
    
    // Convert 12-hour format to 24-hour format
    let hours = period === "PM" && hour !== 12 ? hour + 12 : hour;
    hours = period === "AM" && hour === 12 ? 0 : hours; // 12 AM should be 00:00

    return new Date(`${date}T${hours.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`);
  };

  const filterEvents = () => {
    const now = new Date();
    return meetings.filter(event => {
      const eventDateTime = parseEventDateTime(event);
      console.log(event)

      if (activeTab === "upcoming") {
        return event.status === "Accepted" && eventDateTime > now;
      }
      if (activeTab === "pending") {
        return event.status === "Pending" && eventDateTime > now;
      }
      if (activeTab === "canceled") {
        return event.status === "Rejected";
      }
      if (activeTab === "past") {
        return eventDateTime < now;
      }
      return false;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingDiv}>
        <div className={linkstyles.line1}>
          <h3>Booking</h3>
        </div>
        <p className={linkstyles.discription}>
          See upcoming and past events booked through your event type links.
        </p>
      </div>
      <div className={styles.bookingContainer}>
        <div className={styles.tabContainer}>
          {["upcoming", "pending", "canceled", "past"].map((tab) => (
            <div
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ""
                }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>
        <div className={styles.eventsList}>
          {filterEvents().length > 0 ? (
            filterEvents().map(event => (
              <ShowEvent key={event._id} event={event} onStatusChange={loadEvents}/>
            ))
          ) : (
            <p className={styles.noEventsMessage}>
              {activeTab === "upcoming" && "No upcoming events found."}
              {activeTab === "pending" && "No pending events found."}
              {activeTab === "canceled" && "No canceled events found."}
              {activeTab === "past" && "No past events found."}
            </p>
          )}
        </div>
      </div>

      {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default Appearance;
