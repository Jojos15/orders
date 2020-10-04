import React, { useState } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from './api/api'

function App() {

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    api.post('/users/login', {username: username, password: password})
      .then((response) => {
        if(response.status === 200){
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

    api.get('/users', { headers: {
      'auth-token': authToken
    }})
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

  const btnTestHandler = (e) => {
    getUsers();
  };

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
      <h1 className="title">Hello Reasct</h1>
      <h3 className="title">Login</h3>
      <form className="input" noValidate autoComplete="off">
        <TextField onChange={usernameHandler} value={username} id="standard-basic" label="Username" className="textfield" />
        <TextField onChange={passwordHandler} value={password} id="standard-basic" label="Password" className="textfield" />
        <Button onClick={btnLoginHandler} style={{ marginTop: 20 }} variant="contained" color="primary">Login</Button>
        <Button onClick={btnTestHandler} style={{ marginTop: 20 }} variant="contained" color="primary">Y+TEST</Button>
        {users.map( u => {
            return(
              <h1 key={u._id} className="name">{u.username + " " + u.email}</h1>
            );
        })}
      </form>
    </div>
  );
}

export default App;
