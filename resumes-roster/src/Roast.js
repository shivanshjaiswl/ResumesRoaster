// src/components/home.js
import React, { useEffect, useState, useRef } from 'react';
import LoginButton from './src/components/LoginButton';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showLoginButton, setShowLoginButton] = useState(false);
  const pageEndRef = useRef(null);

  const phases = [
    "Hi, I'm an A.I. trained to evaluate resumes. To get started, I'll need to log into your Gmail to see all your application rejections.",
    "I'm just gonna look at your rejection emails. I won't post or change anything."
  ];

  const typeWriter = async (phaseIndex = 0) => {
    if (phaseIndex >= phases.length) return;

    let accumulatedText = '';
    setCurrentMessage('');

    for (let i = 0; i < phases[phaseIndex].length; i++) {
      accumulatedText += phases[phaseIndex][i];
      setCurrentMessage(accumulatedText + '█');
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setMessages((prevMessages) => [...prevMessages, { text: accumulatedText, isAI: true }]);
    setCurrentMessage('');
    pageEndRef.current.scrollIntoView({ behavior: 'smooth' });

    if (phaseIndex === phases.length - 1) {
      setShowLoginButton(true);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      typeWriter(phaseIndex + 1);
    }
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    setMessages([]);
    typeWriter(0);
  }, []);

  return (
    <div style={styles.centeredPage}>
      <div style={styles.chatContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={message.isAI ? styles.aiMessage : styles.userMessage}
          >
            {message.text.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </div>
        ))}
        {currentMessage && (
          <div style={styles.aiMessage}>
            {currentMessage.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </div>
        )}
        {showLoginButton && (
          <div style={styles.flexEndButtonContainer}>
            <LoginButton style={styles.loginButton} />
          </div>
        )}
        <div ref={pageEndRef} />
      </div>
    </div>
  );
};

const styles = {
  centeredPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#ffffff', // Adjusted background color for contrast
  },
  chatContainer: {
    maxWidth: '450px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f8f9fa', // Matches chat-style background
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e5ea',
    color: 'black',
    padding: '10px',
    borderRadius: '10px',
    fontFamily: 'Raleway, sans-serif',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    borderRadius: '10px',
    fontFamily: 'Raleway, sans-serif',
  },
  flexEndButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px',
  },
  loginButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontFamily: 'Raleway, sans-serif',
  },
  cursor: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'gray',
    animation: 'blink 1s step-end infinite',
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
