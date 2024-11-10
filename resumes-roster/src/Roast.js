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
    "", // Placeholder for conditional phase 5 based on response
    "oh great another finance bro",
    "Finding a lot of applications with no responses",
    "Like a LOT.",
    "You've been rejected by x amount of companies this year",
    "u okay?", 
    "You clearly haven't been to the career fair this year either",
    "test"
  ];

  const typeWriter = async (phaseIndex = 0) => {
    if (phaseIndex >= phases.length) return;

    let accumulatedText = '';
    setCurrentMessage('');
    setShowYesNoButtons(false);
    setShowOkayButtons(false);

    for (let i = 0; i < phases[phaseIndex].length; i++) {
      accumulatedText += phases[phaseIndex][i];
      setCurrentMessage(accumulatedText + '█');
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    setMessages((prevMessages) => {
      if (!prevMessages.some(msg => msg.text === accumulatedText)) {
        return [...prevMessages, { text: accumulatedText, isAI: true }];
      }
      return prevMessages;
    });
    setCurrentMessage('');

    if (phaseIndex === 3 || phaseIndex === 4) {
      setShowYesNoButtons(true);
    } else if (phaseIndex === 9) {
      setShowOkayButtons(true);
    } else {
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

    setMessages([]);
    typeWriter(0);
  }, []);

  const handleResponse = async (response) => {
    const phaseIndex = messages.filter(msg => msg.isAI).length;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: response, isAI: false }
    ]);
    setShowYesNoButtons(false);
    setShowOkayButtons(false);

    // Update phase 5 based on response
    if (phaseIndex === 4) {
      phases[4] = response.toLowerCase() === 'yes'
        ? "Like unironically?..."
        : "Are you sure, because I can see the email in my database?...";
    }

    // Handle specific cases for "alright whatever man" and "listen i'm just a neural net"
    if (phaseIndex === 5 && response.toLowerCase() === 'yes') {
      await typeWriterMessage("Alright whatever man");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      typeWriter(6); // Move to the next phase after displaying "Alright whatever man"
      return;
    }

    if (phaseIndex === 9 && response.toLowerCase() === 'not really') {
      await typeWriterMessage("listen i'm just a neural net do what you gotta do");
      return;
    }

    if (phaseIndex === 10) {
      await typeWriterMessage(response.toLowerCase() === 'yes' ? "Hard to believe." : "Clearly.");
    }

    const nextPhaseIndex = messages.filter(msg => msg.isAI).length;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    typeWriter(nextPhaseIndex);
  };

  const typeWriterMessage = async (message) => {
    let accumulatedText = '';
    setCurrentMessage('');
    for (let i = 0; i < message.length; i++) {
      accumulatedText += message[i];
      setCurrentMessage(accumulatedText + '█');
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setMessages((prevMessages) => [...prevMessages, { text: accumulatedText, isAI: true }]);
    setCurrentMessage('');
    pageEndRef.current.scrollIntoView({ behavior: 'smooth' });
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
};

export default Roast;
