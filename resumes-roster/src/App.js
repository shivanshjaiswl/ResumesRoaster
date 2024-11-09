// src/App.js
import React from 'react';
import Home from './Home';
import Upload from './Upload';


export default function App() {
    const path = window.location.pathname.toLowerCase();

    if (path === "/upload") {
        return <Upload />;
    } else {
        return <Home />;
    }
}