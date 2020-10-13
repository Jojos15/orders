import React, { useState } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from './api/api'
import weskglogo from './img/weskglogo.png'

function App() {

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    api.post('/users/login', { username: username, password: password })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('auth-token', JSON.stringify(response.data));
          console.log("ΣΟΥΞΕ");
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const getUsers = async () => {

    let authToken = JSON.parse(localStorage.getItem('auth-token'));

    api.get('/users', {
      headers: {
        'auth-token': authToken
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data)
          console.log("ΣΟΥΞΕ 2");
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const btnLoginHandler = (e) => {
    login();
  };

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="App">
      {/* <div className="content"> */}
      <img src={weskglogo} alt="WESKG" className="loginlogo" />
      <h3 className="title">Orders Login</h3>
      <form className="input" noValidate autoComplete="off">
        <TextField onChange={usernameHandler} value={username} id="standard-basic" label="Username" className="textfield" />
        <TextField onChange={passwordHandler} value={password} id="standard-basic" label="Password" className="textfield" />
        <Button onClick={btnLoginHandler} variant="contained" color="primary" className="btn">Login</Button>
      </form>
    </div>
    //</div>
  );
}

export default App;
