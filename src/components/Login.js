import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../api/api'
import weskglogo from '../img/weskglogo.png'
import Grid from '@material-ui/core/Grid';

const Login = () => {

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
        <div className="col-12">
            <div className="row justify-content-center">
                <div className="col-md-6 col-12 text-center">
                    <img src={weskglogo} alt="WESKG" className="loginlogo" />
                </div>
            </div>
            <div className="row justify-content-center">
                <h2 className="col-6 col-md-3 text-center">Orders Login</h2>
            </div>
            <form noValidate autoComplete="off">
                <div className="row justify-content-center align-content-stretch">
                    <div className="col-md-4 col-8 text-center">
                        <TextField className="w-100" onChange={usernameHandler} value={username} id="standard-basic" label="Username" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4 col-8 text-center">
                        <TextField className="w-100" onChange={passwordHandler} value={password} id="standard-basic" label="Password" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 col-md-3 text-center">
                        <Button className="w-100" onClick={btnLoginHandler} onSubmit={btnLoginHandler} type="submit" variant="contained" color="primary">Login</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login