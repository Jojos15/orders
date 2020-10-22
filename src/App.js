import React, { useState } from 'react';
import Login from "./components/Login";
import './App.css';

function App() {

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <Login />
                </div>
            </div>
        </div>
    );
}

export default App;
