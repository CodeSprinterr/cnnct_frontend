import styles from '../styles/analytics.module.css';
import { useEffect, useState } from 'react';
import ToggleButtons from '../components/toggle';
import AvailabilityHeader from '../components/AvailabilityHeader';
import { myCalenderEvents, saveTimeSlot, getAvailability } from '../services';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { MdContentCopy } from "react-icons/md";

const localizer = momentLocalizer(moment);
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Availability = () => {
  const [activeButton, setActiveButton] = useState("availability");
  const [meetings, setMeetings] = useState([]);
  const [calendarView, setCalendarView] = useState("week");
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    try {
      const response = await getAvailability();
      const data = await response.json();

      if (data.success) {
        const fetchedAvailability = data.availability;

        // Ensure all 7 days exist in the state
        const completeAvailability = weekdays.map((day) => {
          const existingDay = fetchedAvailability.find((d) => d.day === day);

          return existingDay
            ? existingDay
            : { day, available: false, slots: [] }; // Default for missing days
        });

        setAvailability(completeAvailability);
      } else {
        setDefaultAvailability();
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      setDefaultAvailability();
    }
  };

  const setDefaultAvailability = () => {
    setAvailability(
      weekdays.map((day) => ({
        day,
        available: false,
        slots: [],
      }))
    );
  };
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const response = await myCalenderEvents();
    const data = await response.json();
    if (data.success) {
      setMeetings(data.events);
    }
  };

  // Parse event start time
  const parseEventDateTime = (event) => {
    const { date, time, period } = event;
    const [hour, minute] = time.split(":").map(Number);

    let hours = period === "PM" && hour !== 12 ? hour + 12 : hour;
    hours = period === "AM" && hour === 12 ? 0 : hours;

    return new Date(`${date}T${hours.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`);
  };

  // Convert duration into milliseconds
  const parseDuration = (duration) => {
    const match = duration.match(/(\d+)(hour|mins)/);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2];

    return unit === "hour" ? value * 60 * 60 * 1000 : value * 60 * 1000;
  };

  const events = meetings.map((event) => {
    const start = parseEventDateTime(event);
    const end = new Date(start.getTime() + parseDuration(event.duration));
    return {
      title: `${event.time} ${event.period}\n${event.topic}`,
      start,
      end,
      status: event.status,
    };
  });

  const getRandomColor = () => {
    const colors = [
      ["#E7F6FD", "#0369A1"],
      ["#F4EFFF", "#6D2AD9"],
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Event styling
  const eventStyleGetter = (event) => {
    const [backgroundColor, textColor] = getRandomColor();

    return {
      style: {
        backgroundColor: event.status === "Rejected" ? "#d3d3d3" : backgroundColor,
        borderRadius: "5px",
        width: '100%', // Ensure full width
        height: '100%', // Ensure full height
        color: event.status === "Rejected" ? "#000" : textColor,
        fontWeight: "bold",
        fontSize: "12px",
        padding: "10px",
        whiteSpace: "pre-line",
        textAlign: "left",
        display: "flex", // Ensure full expansion
        alignItems: "center", // Center text vertically
        justifyContent: "left", // Align text properly
      },
    };
  };

  const updateAvailabilityInDB = async (updatedAvailability) => {
    try {
      const response = await saveTimeSlot(updatedAvailability);
      const data = await response.json();

      if (!data.success) {
        console.error("Failed to update availability:", data.message);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };




  const toggleAvailability = async (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].available = !updatedAvailability[index].available;

    if (!updatedAvailability[index].available) {
      updatedAvailability[index].slots = [];
    } else {
      updatedAvailability[index].slots = [{ start: "", end: "" }];
    }

    setAvailability(updatedAvailability);
    await updateAvailabilityInDB(updatedAvailability[index]);  // ✅ Fix: Pass the specific day's data
  };
  const addSlot = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].slots.push({ start: "", end: "" });
    setAvailability(updatedAvailability);
  };

  const handleTimeChange = async (dayIndex, slotIndex, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].slots[slotIndex][field] = value;
    setAvailability(updatedAvailability);

    const slot = updatedAvailability[dayIndex].slots[slotIndex];
    if (slot.start && slot.end) {
      await updateAvailabilityInDB(updatedAvailability[dayIndex]);  // ✅ Fix: Pass only the day's data
    }
  };

  const removeSlot = async (dayIndex, slotIndex) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].slots.splice(slotIndex, 1);
    setAvailability(updatedAvailability);
    await updateAvailabilityInDB(updatedAvailability[dayIndex]);  // ✅ Fix: Pass only the day's data
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingDiv}>
        <h3>Availability</h3>
        <p className={styles.description}>Set and view your available times</p>
      </div>
      <div className={styles.mobileToggle}>
        <ToggleButtons activeButton={activeButton} setActiveButton={setActiveButton} />
      </div>

      {activeButton === "availability" ? (
        <div className={styles.availabilityContent}>
          <AvailabilityHeader />

          <div className={styles.availabilityDiv}>
            <h5>Weekly hours</h5>
            {availability.map((day, index) => (
              <div key={day.day} className={styles.availabilityRow}>
                <input
                  type="checkbox"
                  checked={day.available}
                  onChange={() => toggleAvailability(index)}
                />
                <span className={styles.dayLabel}>{day.day}</span>
                {!day.available ? (
                  <span className={styles.unavailableText}>Unavailable</span>
                ) : (
                  <div className={styles.timeSlots}>
                    {day.slots.map((slot, slotIndex) => (
                      <div key={slotIndex} className={styles.timeSlot}>
                        <input
                          type="time"
                          className={styles.timeInput}
                          value={slot.start}
                          onChange={(e) => handleTimeChange(index, slotIndex, "start", e.target.value)}
                        />
                        <span> - </span>
                        <input
                          type="time"
                          className={styles.timeInput}
                          value={slot.end}
                          onChange={(e) => handleTimeChange(index, slotIndex, "end", e.target.value)}
                        />
                        {day.slots.length > 1 && (
                          <FaTimes
                            className={styles.removeIcon}
                            onClick={() => removeSlot(index, slotIndex)}
                          />
                        )}
                      </div>
                    ))}

                  </div>
                )}
                <div className={styles.addSlotWrapper}>
                  <FaPlus className={styles.addIcon} onClick={() => addSlot(index)} />
                </div>
                <div className={styles.addSlotWrapper}>
                  <MdContentCopy className={styles.addIcon} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.calendarContainer}>
          <AvailabilityHeader />
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, padding: 20 }}
            views={['day', 'week', 'month']}
            view={calendarView}
            onView={(newView) => setCalendarView(newView)}
            eventPropGetter={eventStyleGetter}
            step={30}
            timeslots={2}
            selectable={true}
            defaultView="week"
          />
        </div>
      )}
    </div>
  );
};

export default Availability;
