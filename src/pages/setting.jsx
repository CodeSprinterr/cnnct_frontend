import Heading from '../components/heading';
import styles from '../styles/settings.module.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../pages/dashboard';
import { updateProfile } from '../services';
import Toaster from '../components/toaster';

const Setting = () => {
  const { user, setUser } = useContext(UserContext);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setToast({ message: "Passwords do not match", type: "error" });
      return;
    }

    try {
      const response = await updateProfile(formData);
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToast({ message: "successfully saved", type: "success" });
      } else {
        setToast({ message: "Failed to update profile.", type: "error" });
      }

    } catch (error) {
      console.error('Error updating profile:', error);
      setToast({ message: "An error occurred.", type: "error" });
    }
  };

  return (
    <div className={styles.container}>
      <Heading className={styles.displayNone} />
      
      {toast.message && <Toaster message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />}
      <div className={styles.card}>
        <h3 className={styles.cardTitle + ' ' + styles.displayNone}>Edit Profile</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fromContainer}>
            <div className={styles.formGroup}>
              <label>First name</label>
              <input
                type="text"
                className={styles.formInput}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.submitButton}>
            <button onClick={handleSubmit} className={styles.saveButton}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
