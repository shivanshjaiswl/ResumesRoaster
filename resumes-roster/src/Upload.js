// src/components/home.js
import React, { useEffect, useState } from "react";

const Upload = () => {
  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [fade, setFade] = useState(false);
  const fullText =
    "Let's see what you've got, upload your resume.\n\n\n....I promise I won't sell your data lol";

  useEffect(() => {
    // Load the Raleway font from Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap";
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
        setTimeout(() => setFade(true), 2000); // Start fading after 2 seconds
      }
    };

    typeWriter();
  }, []);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      const formData = new FormData();
      formData.append("resume", file);
      const response = await fetch(
        "http://rnftc-2620-cc-8000-1c83-b514-5f33-49fd-39f7.a.free.pinggy.link/upload_pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully:", data);
      } else {
        console.error("File upload failed:", response.statusText);
      }
      
    }
  };

  return (
    <div style={styles.centeredPage}>
      <div style={styles.textContainer}>
        <p style={{ ...styles.centeredText }}>
          {text}
          <span style={styles.cursor}>█</span>{" "}
          {/* Blinking cursor at the end of the text */}
        </p>
        {showButton && (
          <div style={styles.buttonContainer}>
            <button style={styles.loginButton}>
              <label style={{ cursor: "pointer" }}>
                Upload your resume
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx" // Limit to resume file types
                />
              </label>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  centeredPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    textAlign: "center",
    padding: "20px",
  },
  textContainer: {
    maxWidth: "450px",
    textAlign: "left",
  },
  centeredText: {
    fontSize: "14px",
    color: "black",
    textAlign: "left",
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "0.2em",
    fontWeight: "550",
    whiteSpace: "pre-wrap", // Maintain line breaks
    display: "inline",
  },
  cursor: {
    fontWeight: "bold",
    fontSize: "14px",
    color: "gray",
    animation: "blink 1s step-end infinite", // Blinking effect
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "40px",
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

export default Upload;
