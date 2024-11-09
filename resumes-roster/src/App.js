// src/components/home.js
import React from 'react';

const SimpleCenteredText = () => {
  return (
    <div style={styles.centeredPage}>
      <h1 style={styles.centeredText}><p>Welcome to the Resumes Roste Hi, I'm an A.I. trained to evaluate resumes.</p>  <p>To get started, I'll need to log into your Gmail to see all your application rejections.
        I'm just gonna look at your rejection emails. I won't post or change anything.</p></h1>
    </div>
  );
};

const styles = {
  centeredPage: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    width: '80vh'
  },
  centeredText: {
    fontSize: '12px',
    color: '#333',
  },
};

export default SimpleCenteredText;
