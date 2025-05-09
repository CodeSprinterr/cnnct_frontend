// EditEvent.jsx
import styles from "../styles/createEvent.module.css";
import { useState, useContext, useEffect } from "react";
import Toaster from "../components/toaster";
import { UserContext } from '../pages/dashboard';
import { updateEvent } from '../services';
import { useNavigate, useLocation } from 'react-router-dom';

const predefinedColors = ["#EF6500", "#FFFFFF", "#000000"];

const EditEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, imageBase64 } = useContext(UserContext);
  const [localUser, setLocalUser] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [showNextScreen, setShowNextScreen] = useState(false);
  const [eventData, setEventData] = useState(location.state?.eventData || {});
  const [color, setColor] = useState("#000000");
  const [bannerColor, setBannerColor] = useState("#342B26");

  const [formData, setFormData] = useState({
    topic: "",
    password: "",
    hostName: "Sarthak Pal",
    description: "",
    date: "",
    time: "02:30",
    period: "PM",
    timezone: "UTC +5:00 Delhi",
    duration: "1 hour",
    link: "",
    emails: ""
  });
  const handleColorChange = (newColor) => {
    setColor(newColor);
    setBannerColor(newColor);
  };
  useEffect(() => {
    if (eventData) {
      console.log(eventData.emails)
      // Convert the event data to match the form structure
      setFormData({
        topic: eventData.topic || "",
        password: eventData.password || "",
        hostName: eventData.hostName || "Sarthak Pal",
        description: eventData.description || "",
        date: eventData.date || "",
        time: eventData.time?.split(':').slice(0, 2).join(':') || "02:30",
        period: eventData.period || "PM",
        timezone: eventData.timezone || "UTC +5:00 Delhi",
        duration: eventData.duration || "1 hour",
        link: eventData.link || "",
        emails: eventData.emails?.join(', ') || "",
      });

      setBannerColor(eventData.bannerColor || '#342B26');
      setColor(eventData.bannerColor || '#342B26');

    }
  }, [eventData]);

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setLocalUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("user");
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (user || localUser) {
      setFormData((prevData) => ({
        ...prevData,
        hostName: `${(user || localUser).firstName} ${(user || localUser).lastName}`,
      }));
    }
  }, [user, localUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!showNextScreen) {
      setShowNextScreen(true);
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailList = formData.emails.split(",").map(email => email.trim());

    const invalidEmails = emailList.filter(email => !emailPattern.test(email));

    if (invalidEmails.length > 0) {
      setToast({
        message: `Invalid email(s): ${invalidEmails.join(", ")}`,
        type: "error",
      });
      return;
    }

    try {
      const updatedFormData = { ...formData, bannerColor };
      const response = await updateEvent(eventData._id, updatedFormData);
      if (response.ok) {
        const res = await response.json();
        localStorage.setItem("eventSuccess", res.message);
        navigate("/dashboard/events");
      } else {
        setToast({ message: "Failed to update event", type: "error" });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      setToast({ message: "An error occurred.", type: "error" });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/events");
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingDiv}>
        <div className={styles.line1}>
          <h3>Edit Event</h3>
        </div>
        <p className={styles.discription}>
          Edit your event details below.
        </p>
        <p>Editing: {eventData.topic || "Event"}</p>
      </div>

      {toast.message && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formHeader}>
          <h2 className={styles.addEvent}>Edit Event</h2>
        </div>
        <div style={{ padding: "15px 40px" }}>
          {!showNextScreen ? (
            <>
              <div className={styles.formGroup} style={{ marginTop: "20px" }}>
                <label>
                  Event Topic <span className={styles.redStar}>*</span>
                </label>
                <input
                  type="text"
                  name="topic"
                  placeholder="Set a conference topic before it starts"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Password</label>
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ marginLeft: "20px" }}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Host name <span className={styles.redStar}>*</span>
                </label>
                <select name="hostName" value={formData.hostName} onChange={handleChange}>
                  {user || localUser ? (
                    <option value={`${(user || localUser).firstName} ${(user || localUser).lastName}`}>
                      {`${(user || localUser).firstName} ${(user || localUser).lastName}`}
                    </option>
                  ) : null}
                  <option value="Sarthak Pal">Sarthak Pal</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>

              <div className={styles.formGroup} style={{ paddingBottom: "10px", borderBottom: '2px solid #ccc' }}>
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Add a description..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.dateTimeGroup}>
                <label>Date and time <span className={styles.redStar}>*</span></label>
                <div className={styles.dateSelect}>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={{ width: '25%' }}
                  />

                  <div className={styles.timeSelect}>
                    <select name="time" value={formData.time} style={{ width: 'fit-content' }} onChange={handleChange}>
                      <option value="02:30">02:30</option>
                      <option value="03:00">03:00</option>
                      <option value="04:00">04:00</option>
                    </select>
                    <select name="period" value={formData.period} onChange={handleChange}>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>

                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    style={{ width: '45%' }}
                  >
                    <option value="UTC +5:00 Delhi">(UTC +5:00 Delhi)</option>
                    <option value="UTC +0:00 GMT">(UTC +0:00 GMT)</option>
                    <option value="UTC -5:00 New York">(UTC -5:00 New York)</option>
                  </select>
                </div>
              </div>

              <div className={styles.dateTimeGroup1}>
                <label>Set duration</label>
                <select name="duration" value={formData.duration} onChange={handleChange} style={{ width: '22%' }}>
                  <option value="30mins">30 mins</option>
                  <option value="1hr">1 hour</option>
                  <option value="2hr">2 hours</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className={styles.bannerDiv}>
                <h4>Banner</h4>
                <div className={styles.bannerSection}>
                  <div className={styles.bannerHero} style={{ backgroundColor: bannerColor }}>
                    <div className={styles.bannerImg}>
                      <img src={imageBase64} alt="img" />
                    </div>
                    <div className={styles.usernameDiv}>
                      <span id='eventTopic'>{formData.topic}</span>
                    </div>
                  </div>
                  <div className={styles.colorPicker}>
                    <p>Custom Background Color</p>
                    <div className={styles.colorOptions}>
                      {predefinedColors.map((c) => (
                        <button
                          key={c}
                          type="button"
                          className={styles.colorCircle}
                          style={{ backgroundColor: c, border: c === "#FFFFFF" ? "1px solid #ccc" : "none" }}
                          onClick={() => handleColorChange(c)}
                        ></button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'start', gap: '15px' }}>
                      <div className={styles.colorPreview} style={{ backgroundColor: color }}></div>
                      <input
                        type="text"
                        className={styles.colorInput}
                        value={color}
                        onChange={(e) => handleColorChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Add link <span className={styles.redStar}>*</span></label>
                <input
                  type="url"
                  name="link"
                  placeholder="Enter URL Here"
                  value={formData.link}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Add Emails <span className={styles.redStar}>*</span></label>
                <input
                  type="text"
                  name="emails"
                  placeholder="Add emails, separated by commas"
                  value={formData.emails}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className={styles.buttonGroup}>
            <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              {showNextScreen ? "Update" : "Next"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;