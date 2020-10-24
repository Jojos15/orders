import React from 'react';
import Login from "./components/login";
import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {

    return (
        <Router>
            <div className="App">
                <div className="container-fluid">
                    <div className="row h-100">
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
