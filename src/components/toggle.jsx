import { useState, useRef, useEffect } from "react";
import styles from "../styles/toggleButtons.module.css";
import { FaListUl } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";

const ToggleButtons = ({ activeButton, setActiveButton }) => {
  const availabilityRef = useRef(null);
  const calendarRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({});

  useEffect(() => {
    updateSliderStyle(activeButton);
  }, [activeButton]);

  const handleClick = (button) => {
    setActiveButton(button);
  };

  const updateSliderStyle = (button) => {
    const activeRef = button === "availability" ? availabilityRef.current : calendarRef.current;
    if (activeRef) {
      setSliderStyle({
        width: `${activeRef.offsetWidth}px`,
        left: `${activeRef.offsetLeft}px`,
        opacity: 1,
      });
    }
  };

  return (
    <div className={styles.toggleContainer}>
      <button
        ref={availabilityRef}
        className={`${styles.toggleButton} ${activeButton === "availability" ? styles.active : ""}`}
        onClick={() => handleClick("availability")}
      >
        <FaListUl className={styles.icon} />
        <label>Availability</label>
      </button>
      <button
        ref={calendarRef}
        className={`${styles.toggleButton} ${activeButton === "calendar" ? styles.active : ""}`}
        onClick={() => handleClick("calendar")}
      >
        <FaRegCalendarAlt className={styles.icon} />
        <label>Calendar View</label>
      </button>

      <div className={styles.slider} style={sliderStyle} />
    </div>
  );
};

export default ToggleButtons;
