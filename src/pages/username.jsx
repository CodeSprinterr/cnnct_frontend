import styles from '../styles/login.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setuserName } from '../services'
import logo from '../assets/logo-group.svg'
import bussiness from '../assets/business.png';
import books from '../assets/books.png';
import gov from '../assets/gov.png';
import tech from '../assets/tech.png';


const username = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");
  const categories = [
    { name: "Sales", icon: bussiness },
    { name: "Education", icon: books },
    { name: "Government & Politics", icon: gov },
    { name: "Tech", icon: tech },
  ]

  const submitDetails = async (e) => {
    e.preventDefault()
    setError("");

    if (!username.trim() || !selectedCategory) {
      if (!username.trim()) {
        setError("Username is required.");
      } else {
        setError("Category is required")
      }
      return;
    }

    try {
      setIsLoading(true);
      const response = await setuserName({ username, category: selectedCategory });
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        if (data.success) {
          navigate("/dashboard");
        }
        setError(data.message);
      }

    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Spark Logo" style={{ width: "123px", height: "33px" }} />
        </div>
        <div className={styles.leftContainer}>
          <div className={styles.innerContainer}>
            <h1 style={{ fontSize: '30px', fontWeight: '900', letterSpacing: '-2.04px', lineHeight: '58.8px' }}>Your Preferences</h1>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: "100%",
            }}>
              <input style={{
                padding: "15px",
                marginTop: "30px",
                borderRadius: "10px",
                backgroundColor: "#F6F7F5",
                border: "none",
                outline: "none",
                color: 'black',
              }} type="text" placeholder="Tell us your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: "100%",
              marginTop: "30px"
            }}>
              <h4 style={{ fontWeight: '600' , marginBottom: '10px' }}>Select one category that best describes your CNNCT:</h4>
              <div className={styles.categoryContainer}>
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`${styles.categoryButton} ${selectedCategory === category.name ? styles.selected : ''}`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <img src={category.icon} alt={category.name} className={styles.categoryIcon} />
                    {category.name}
                  </button>
                ))}
              </div>

            </div>
            {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
            <button
              style={{
                marginTop: "20px",
                padding: "15px",
                width: "100%",
                borderRadius: "25px",
                backgroundColor: "#1877F2",
                border: "none",
                outline: "none",
                cursor: "pointer",
                opacity: 1,
                transition: "opacity 0.3s ease",
                color: "#FFFFFF"
              }}
              onClick={submitDetails}
            >
              {isLoading ? "Submitting..." : "Continue"}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.imageContainer}></div>
      </div>
    </div>
  )
}

export default username