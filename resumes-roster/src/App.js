// src/App.js
import React from 'react';
import Home from './Home';
import Upload from './Upload';
import Roast from './Roast';




export default function App() {
    const path = window.location.pathname.toLowerCase();

    if (path == "/upload") {
      return <Upload />;
    } else if (path == "/roast") {
      return <Roast />;
    } else {
        return <Home />;
    }
}