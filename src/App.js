import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Login from "./components/Login";
import './App.css';

function App() {

    return (
        <div className="App">
            <Container maxWidth="sm">
                <Login />
            </Container>
        </div>
    );
}

export default App;
