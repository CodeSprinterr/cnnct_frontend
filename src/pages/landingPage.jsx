import { Link } from "react-router-dom";
import styles from '../styles/landingPage.module.css'
import largeLogo from '../assets/landing_page_logo.png'
import logo from '../assets/logo.svg'
import hemburger from '../assets/hemburger.svg'
import cal1 from '../assets/cal1.png'
import cal2 from '../assets/cal2.png'
import hero1 from '../assets/hero1.png'
import hero2 from '../assets/hero2.svg'
import media from '../assets/media.svg'
import flower from '../assets/flower.svg'

import ServiceGrid from '../components/services'
import Footer from '../components/footer'

const landingPage = () => {

  const testimonials = [
    {
      id: 1,
      title: "Amazing tool! Saved me months",
      content:
        "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "John Master",
      role: "Director, Spark.com",
      variant: "gray",
    },
    {
      id: 2,
      title: "Amazing tool! Saved me months",
      content:
        "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "John Master",
      role: "Director, Spark.com",
      variant: "white",
    },
    {
      id: 3,
      title: "Amazing tool! Saved me months",
      content:
        "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "John Master",
      role: "Director, Spark.com",
      variant: "white",
    },
    {
      id: 4,
      title: "Amazing tool! Saved me months",
      content:
        "This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.",
      author: "John Master",
      role: "Director, Spark.com",
      variant: "gray",
    },
  ]
  return (
    <>
      <div className={styles.outerDiv}>

        <div className={styles.outerDiv1}>
          <div className={styles.headerDiv}>
            <div className={styles.imgDiv}>
              <img src={largeLogo} alt="logo" border="0" className={styles.img} />
              <img src={logo} alt="logo" className={styles.mobileLogo} />
            </div>
            <Link to="/register">
              <button className={styles.signUpButton}>Sign up free</button>
            </Link>
            <img src={hemburger} alt="hemburger" className={styles.mobileLogo} />
          </div>
        </div>

        <div className={styles.heroSection}>
          <div className={styles.textContianer}>
            <div className={styles.heroText}>
              CNNCT - Easy <br />  Scheduling Ahead
            </div>
            <button className={styles.signUpButton} style={{ marginTop: '30px' }}>Get your free Spark</button>
          </div>
          <div className={styles.imageContianer}>
            <img src={hero1} alt="hero1" className={styles.heroImage} />
          </div>
        </div>
        
        <div className={styles.descriptionSection}>
          <div className={styles.textContianer}>
            <div className={styles.descText}>
              Simplified scheduling for you and your team
            </div>
          </div>
          <p className={styles.descriptionText}>CNNCT eliminates the back-and-forth of scheduling meetings so you can foucs on what matters. Set your availability, share your link, and let others book time with you instantly.</p>
        </div>
        <div className={styles.calendarSectionTop}>
          <div className={styles.calendarSection}>
            <div className={styles.textContent}>
              <h2>Stay Organized with Your Calendar & Meetings</h2>
              <p>Seamless Event Scheduling</p>
              <ul>
                <li>View all your upcoming meetings and appointments in one place.</li>
                <li>Syncs with Google Calendar, Outlook, and iCloud to avoid conflicts.</li>
                <li>Customize event types: one-on-ones, team meetings, group sessions, and webinars.</li>
              </ul>
            </div>
            <div className={styles.imageContainer}>
              <img src={cal1} alt="Calendar 1" className= {styles.tiltedImage1 + ' ' + styles.left} />
              <img src={cal2} alt="Calendar 2" className= {styles.tiltedImage2 + ' ' + styles.right} />
            </div>
          </div>
        </div>
        

        <div className={styles.outerDiv1 + " " + styles.customerDiv}>
          <div className={styles.customer1}>
            <h3>Here's what our <span style={{ color: '#1877F2' }}>customer</span> has to says</h3>
            <button>Read Customer Stories</button>
          </div>
          <div className={styles.customer2}>
            <img src={flower} alt="icon" />
            <p> [short description goes in here] loerm ipsum is a placehodler text to demonstrate</p>
          </div>
        </div>

        <div style={{ backgroundColor: "#F9F9F9" }}>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={`${styles.testimonialCard} ${styles[testimonial.variant]}`}>
                <h2>{testimonial.title}</h2>
                <p>{testimonial.content}</p>
                <div className={styles.authorInfo}>
                  <div className={styles.avatar}></div>
                  <div className={styles.authorDetails}>
                    <div className={styles.authorName}>{testimonial.author}</div>
                    <div className={styles.authorRole}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.outerDiv1}>
          <ServiceGrid />
        </div>
        <div style={{ padding: '5px 60px', backgroundColor: '#F9F9F9' }}>
          <Footer styles={{ paddingBottom: '0px;' }} />
        </div>


      </div>
    </>
  )
}

export default landingPage