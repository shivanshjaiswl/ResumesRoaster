// src/components/home.js
import React, { useEffect, useState } from 'react';

const Upload = () => {
  const [text, setText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [fade, setFade] = useState(false);
  const fullText = "Let's see what you've got, upload your resume. <br /><br /> <br /><br /> ....I promise I won't sell your data lol";

  useEffect(() => {
    // Load the Raleway font from Google Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    let index = 0;

    const typeWriter = () => {
      if (index < fullText.length) {
        const currentText = fullText.substring(0, index + 1).replace(/<br \/>/g, '\n');
        setText(currentText);
        index++;
        setTimeout(typeWriter, 50);
      } else {
        setShowButton(true);
        setTimeout(() => setFade(true), 2000); // Start fading after 2 seconds
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
          <div style={styles.buttonContainer}>
            <button style={styles.loginButton}>Upload your resume</button>
          </div>
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
      height: '70vh',
      textAlign: 'center',
      padding: '20px',
    },
    textContainer: {
      maxWidth: '450px',
      textAlign: 'left',
    },
    centeredText: {
      fontSize: '14px',
      color: 'black',
      textAlign: 'left',
      fontFamily: 'Raleway, sans-serif',
      letterSpacing: '0.2em',
      fontWeight: '550',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end', // Aligns button to the right
    },
    loginButton: {
      marginTop: '20px',
      padding: '10px 15px',
      fontSize: '13px',
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid black',
      cursor: 'pointer',
      borderRadius: '5px',
      fontFamily: 'Raleway, sans-serif',
    },
  };
  
  export default Upload;
  