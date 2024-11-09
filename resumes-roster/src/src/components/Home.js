// src/components/home.js
import React, { useState } from 'react';

const HowBadIsYourResume = () => {
  const [resumeText, setResumeText] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleTextChange = (e) => {
    setResumeText(e.target.value);
  };

  return (
    <div style={styles.howBadPage}>
      <h1>How Bad is Your Resume?</h1>
      <p style={styles.introText}>
        Hi, I'm an A.I. trained to evaluate resumes. To get started, I'll need to log into your Gmail to see all your application rejections.
        I'm just gonna look at your rejection emails. I won't post or change anything.
      </p>
      <textarea
        value={resumeText}
        onChange={handleTextChange}
        placeholder="Paste your resume here..."
        style={styles.resumeTextarea}
      ></textarea>
      <button style={styles.analyzeButton}>Analyze</button>
      {feedback && <p style={styles.feedback}>{feedback}</p>}
    </div>
  );
};

const styles = {
  howBadPage: {
    textAlign: 'center',
    padding: '20px',
  },
  introText: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#333',
  },
  resumeTextarea: {
    width: '80%',
    height: '150px',
    margin: '20px 0',
    padding: '10px',
    fontSize: '16px',
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  feedback: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#d9534f',
  },
};

export default HowBadIsYourResume;
