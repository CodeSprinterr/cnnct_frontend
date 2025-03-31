// links.jsx
import styles from "../styles/links.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Toaster from "../components/toaster";
import MeetingCard from "../components/MeetingCard";
import { IoAddSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { fetchEvent, updateEventStatus, deleteEvent } from '../services';

const Links = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", type: "" });
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    const successMessage = localStorage.getItem("eventSuccess");
    if (successMessage) {
      setToast({ message: successMessage, type: "success" });
      localStorage.removeItem("eventSuccess");
    }
  }, []);

  const loadEvents = async () => {
    const response = await fetchEvent();
    const data = await response.json();
    if (data.success) {
      setMeetings(data.events);
    }
  };

  const handleEdit = (eventId, event) => {
    navigate(`/dashboard/edit/${eventId}`, { state: { eventData: event } });
  };

  const handleToggleStatus = async (eventId, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    setMeetings((prevMeetings) =>
      prevMeetings.map(meeting =>
        meeting._id === eventId ? { ...meeting, isActive: newStatus } : meeting
      )
    );

    try {
      const response = await updateEventStatus(eventId, newStatus);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
    } catch (error) {
      setMeetings((prevMeetings) =>
        prevMeetings.map(meeting =>
          meeting._id === eventId ? { ...meeting, isActive: currentStatus } : meeting
        )
      );
      console.error("Failed to update event status", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setMeetings((prevMeetings) => prevMeetings.filter(meeting => meeting._id !== eventId));

    try {
      const response = await deleteEvent(eventId);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setToast({ message: "Event deleted successfully", type: "success" });
    } catch (error) {
      console.error("Failed to delete event", error);
      setToast({ message: "Failed to delete event", type: "error" });
      loadEvents(); 
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingDiv}>
        <div className={styles.line1}>
          <h3>Events Type</h3>
        </div>
        <p className={styles.discription}>
          Create events to share for people to book on your calendar.
        </p>
        <p className={styles.newCreate}>
          <span>New</span>
          <Link to='/dashboard/create' style={{ textDecoration: 'none' }}>
            <button className={styles.createNewButton}>
              <IoAddSharp className={styles.addIcon} />
              <span>Add New Events</span>
            </button>
          </Link>
        </p>
      </div>

      {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}

      <div className={styles.content}>
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <MeetingCard
              key={meeting._id}
              title={meeting.topic}
              date={formatDate(meeting.date)}
              timeRange={`${meeting.time} ${meeting.period}`}
              isActive={meeting.isActive}
              link={meeting.link}
              duration={meeting.duration}
              onCopy={() => setToast({ message: "Link copied!", type: "success" })}
              onEdit={() => handleEdit(meeting._id,meeting)}
              onToggle={() => handleToggleStatus(meeting._id, meeting.isActive)}
              onDelete={() => handleDeleteEvent(meeting._id)}
            />
          ))
        ) : (
          <div className={styles.noMeetings}>
            <p>📅 No meetings found. Create a new one to view your events here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Links;
