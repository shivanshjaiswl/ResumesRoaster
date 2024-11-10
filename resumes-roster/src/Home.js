// src/components/home.js
import React, { useEffect, useState } from 'react';
import LoginButton from './src/components/LoginButton';

const Home = () => {
  const [text, setText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const fullText = "Hi, I'm an A.I. trained to evaluate resumes. To get started, I'll need to log into your Gmail to see all your application rejections.\n\nI'm just gonna look at your rejection emails. I won't post or change anything.";

  useEffect(() => {
    // Load the Raleway font from Google Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    let index = 0;

    const typeWriter = () => {
      if (index < fullText.length) {
        setText((prevText) => fullText.substring(0, index + 1));
        index++;
        setTimeout(typeWriter, 50);
      } else {
        setShowButton(true);
      }
    };

    typeWriter();
  }, []);

  const handleResumeRoastClick = () => {
    window.location.href = "/upload"; // This will redirect to the /upload route
  };

  return (
    <div style={styles.centeredPage}>
      <div style={styles.textContainer}>
        <p style={styles.centeredText}>
          {text}
          <span style={styles.cursor}>█</span>{" "}
          {/* Blinking cursor at the end of the text */}
        </p>
        {showButton && (
          <div style={styles.buttonContainer}>
            <LoginButton style={styles.loginButton} />
            <button style={styles.loginButton} onClick={handleResumeRoastClick}>
              Roast Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  centeredPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  },
  textContainer: {
    maxWidth: "450px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8f9fa",
  },
  centeredText: {
    fontFamily: "Raleway, sans-serif",
    color: "#000",
  },
  loginButton: {
    padding: "10px 15px",
    fontSize: "13px",
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
    cursor: "pointer",
    borderRadius: "5px",
    fontFamily: "Raleway, sans-serif",
  },
  cursor: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "gray",
    animation: "blink 1s step-end infinite",
  },
};

// Blinking cursor keyframes
const cursorKeyframes = `
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

// Inject the keyframes into the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(cursorKeyframes, styleSheet.cssRules.length);

export default Home;
