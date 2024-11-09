// src/components/home.js
import React, { useEffect, useState } from 'react';

const SimpleCenteredText = () => {
  const [text, setText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [fade, setFade] = useState(false);
  const fullText = "Hi, I'm an A.I. trained to evaluate resumes. To get started, I'll need to log into your Gmail to see all your application rejections.<br /><br />I'm just gonna look at your rejection emails. I won't post or change anything.";

  useEffect(() => {
    let index = 0;

    const typeWriter = () => {
      if (index < fullText.length) {
        const currentText = fullText.substring(0, index + 1).replace(/<br \/>/g, '\n');
        setText(currentText);
        index++;
        setTimeout(typeWriter, 50);
      } else {
        setShowButton(true);
      }
    };

    typeWriter();
  }, []);

  return (
    <div style={styles.centeredPage}>
      <div style={styles.textContainer}>
        <p style={styles.centeredText}>
          {text.split('\n').map((item, idx) => (
            <React.Fragment key={idx}>
              {item}
              <br />
            </React.Fragment>
          ))}
        </p>
        {showButton && (
          <button style={styles.loginButton}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  centeredPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40vh',
    textAlign: 'center',
    padding: '20px',
  },
  textContainer: {
    maxWidth: '600px',
  },
  centeredText: {
    fontSize: '16px',
    color: '#555',
    textAlign: 'left', // Align text to the left
  },
  loginButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default SimpleCenteredText;
