// src/components/home.js
import React, { useEffect, useState, useRef } from 'react';

const Roast = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showYesNoButtons, setShowYesNoButtons] = useState(false);
  const [showOkayButtons, setShowOkayButtons] = useState(false);
  const pageEndRef = useRef(null);

  const phases = [
    "Loading your emails... Google is limiting how many people can use this app at once, so you'll need to wait or try again later.",
    "Analyzing your rejection history...",
    "lol\n\nomg\n\nokay hold up",
    "Did you really get rejected by...",
    "", // Placeholder for conditional phase 5,
    "oh great another finance bro",
    "Finding a lot of applications with no responses",
    "Like a LOT.",
    "You've been rejected by x amount of companies this year",
    "u okay?"
  ];

  const typeWriter = async (phaseIndex = 0) => {
    if (phaseIndex >= phases.length) return;

    let accumulatedText = '';
    setCurrentMessage(''); // Clear currentMessage for new typing effect
    setShowYesNoButtons(false); // Hide buttons during typing
    setShowOkayButtons(false); // Hide Okay buttons during typing

    // Type out the current phase text
    for (let i = 0; i < phases[phaseIndex].length; i++) {
      accumulatedText += phases[phaseIndex][i];
      setCurrentMessage(accumulatedText + '█'); // Add blinking cursor to current message
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // After typing completes, add the full phase message to messages only if not already added
    setMessages((prevMessages) => {
      if (!prevMessages.some(msg => msg.text === accumulatedText)) {
        return [...prevMessages, { text: accumulatedText, isAI: true }];
      }
      return prevMessages;
    });
    setCurrentMessage(''); // Clear current message after pushing to messages

    // Show Yes/No buttons for the 4th and 5th phases
    if (phaseIndex === 3 || phaseIndex === 4) {
      setShowYesNoButtons(true);
    } else if (phaseIndex === 9) {
      // Show Yes Totally/Not Really buttons for the "u okay?" phase
      setShowOkayButtons(true);
    } else {
      // Proceed to the next phase after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      typeWriter(phaseIndex + 1);
    }
    pageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    setMessages([]); // Start with an empty messages array
    typeWriter(0); // Start typing with the first phase
  }, []);

  const handleResponse = async (response) => {
    const phaseIndex = messages.filter(msg => msg.isAI).length;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, isAI: false }
    ]);
    setShowYesNoButtons(false); // Hide Yes/No buttons after selection
    setShowOkayButtons(false); // Hide Okay buttons after selection
  
    // Update phase 5 based on response
    if (phaseIndex === 4) {
      if (response.toLowerCase() === 'yes') {
        phases[4] = "Like unironically?...";
      } else {
        phases[4] = "Are you sure, because I can see the email in my database?...";
      }
    } else if (phaseIndex === 5) {
      const previousResponse = messages[messages.length - 2]?.text;
      if (previousResponse?.toLowerCase() === 'no...' && response.toLowerCase() === 'yes') {
        phases[5] = "Alright whatever man";
        phases.splice(6, 0, "oh great another finance bro");
      }
    } else if (phaseIndex === 9 && response.toLowerCase() === 'not really') {
      phases.splice(10, 0, "listen i'm just a neural net do what you gotta do");
    }
  
    // Continue to the next phase
    const nextPhaseIndex = messages.filter(msg => msg.isAI).length; // Track the next phase based on messages length
    await new Promise((resolve) => setTimeout(resolve, 1000));
    typeWriter(nextPhaseIndex);
  };

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
        {showYesNoButtons && (
          <div style={styles.flexEndButtonContainer}>
            <button style={styles.choiceButton} onClick={() => handleResponse("yes")}>yes</button>
            <button style={styles.choiceButton} onClick={() => handleResponse("no...")}>no...</button>
          </div>
        )}
        {showOkayButtons && (
          <div style={styles.flexEndButtonContainer}>
            <button style={styles.choiceButton} onClick={() => handleResponse("Yes totally")}>Yes totally</button>
            <button style={styles.choiceButton} onClick={() => handleResponse("Not really")}>Not really</button>
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
  },
  chatContainer: {
    maxWidth: '450px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    color: 'black',
    padding: '10px',
    borderRadius: '10px',
    fontFamily: 'Raleway, sans-serif',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'black',
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
  choiceButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: 'black',
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

// Add blinking cursor animation
const cursorKeyframes = `
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
`;
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(cursorKeyframes, styleSheet.cssRules.length);

export default Roast;
