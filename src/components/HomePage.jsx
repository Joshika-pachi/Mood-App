import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { RiMentalHealthFill } from "react-icons/ri";

const HomePage = () => {
    const featuresRef = useRef(null);
    const aboutUsRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.homepageContainer}>
            <nav className={styles.homepageNavbar}>
                <ul className={styles.homepageNavLinks}>
                    <li><button onClick={() => scrollToSection(featuresRef)}>Features</button></li>
                    <li><button onClick={() => scrollToSection(aboutUsRef)}>About Us</button></li>
                    <li><button onClick={() => scrollToSection(contactRef)}>Contact</button></li>
                </ul>
                <button className={styles.homepageStartTrackingBtn}>
                    <Link to="/login-register" style={{ color: 'white', textDecoration: 'none' }}>
                        Start Tracking
                    </Link>
                </button>
            </nav>

            <div className={styles.homepageLogo}>
                <h1 style={{ font: "28px",color: "#F83D8E" }}><RiMentalHealthFill /> <b>MOOD MAP</b></h1>
            </div>
            <main className={styles.homepageMainContent}>
                <h2 style={{ font: "28px",color: "#683292" }}>The Easiest Way to Track Your Moods Online or Offline</h2>
                <p className={styles.homepageDescription}>
                    Your daily guide to better mental well-being.
                </p>
            </main>

            {/* Sections for Features, About Us, and Contact */}
            <section ref={featuresRef}>
                <h2 style={{color:"#F83D8E"}}>Features</h2>
                 <p><b>1. Mood Logging:</b> Quickly record how you’re feeling each day with simple, intuitive sliders—track emotions like joy, stress, calmness, or anxiety in just a few taps.</p>

  <p><b>2. Sleep Tracking:</b> Keep an eye on your sleep patterns and discover how rest (or lack of it) impacts your mood and overall well-being.</p>

  <p><b>3. Personal Journal:</b> Write down your thoughts, reflections, or daily highlights in a private notes section—your safe space for self-expression.</p>

  <p><b>4. Simple & Clean Design:</b> Navigate effortlessly with a modern, distraction-free interface built to make logging your mental health easy and stress-free.</p>

  <p><b>5. Smart Insights:</b> Get personalized trends and data-driven insights to better understand your emotions, triggers, and progress over time.</p>

  <p><b>6. Privacy First:</b> Your information stays secure. Log at your own pace, with full control over your data and complete peace of mind.</p>

  <p><b>7. Community Support:</b> Join a supportive space where people share experiences, encouragement, and positivity—because no one’s journey should feel alone.</p>
            </section>

            <section ref={aboutUsRef}>
                <h2 style={{color:"#F83D8E"}}>About Us</h2>
             
  <p><b>Our Mission:</b> At <i>Mental Health Tracker</i>, our mission is to make mental well-being a priority for everyone. We believe that self-awareness, reflection, and small daily habits can lead to meaningful growth, healing, and a happier life.</p>

  <p><b>Who We Are:</b> We are a team of mental health advocates, developers, and designers driven by a shared purpose—to create a safe, supportive, and empowering space for individuals. With our app, we aim to give you the tools to understand your emotions, track your progress, and gain personalized insights that truly make a difference.</p>

  <p><b>Our Vision:</b> We dream of a world where mental health is spoken about openly, treated with compassion, and valued as much as physical health. Through <i>Mental Health Tracker</i>, we strive to build a culture of empathy, resilience, and awareness—helping people connect with themselves and others in healthier ways.</p>

  <p><b>Join Us:</b> Whether you want to better understand your moods, build positive habits, or explore uplifting activities, <i>Mental Health Tracker</i> is here to walk with you. Join our growing community and take the first step toward a more mindful, balanced, and positive you.</p>


            </section>

            <section ref={contactRef}>
                <h2 style={{color:"#F83D8E"}}>Contact</h2>
                <p><b>Get in Touch:</b> We’d love to hear from you! Whether you have questions, feedback, or suggestions, your thoughts are important to us.</p>
                <p><b>Feedback Form:</b> Submit Feedback to help us improve your experience and the features you’d like to see in Mental Health Tracker.</p>
                <p><b>Social Media:</b> Connect with us on Twitter, Facebook, and Instagram for updates, tips, and community stories.</p>
                <p><b>Email:</b> For inquiries or support, reach us at support@Mental Health Tracker.com.</p>
            </section>
        </div>
    );
};

export default HomePage;
