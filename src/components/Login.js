import React, { useState, useEffect } from 'react';
import api from '../api/api'
import weskglogo from '../img/weskglogo.png'
import { useHistory } from 'react-router-dom';
import { Digital } from 'react-activity';
import 'react-activity/dist/react-activity.css';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [needsLogin, setNeedsLogin] = useState(false);
    let history = useHistory();

    useEffect(() => {
        const localToken = JSON.parse(localStorage.getItem('auth-token'));
        if (localToken) {
            validateToken(localToken.token);
        }
        else {
            setNeedsLogin(true);
        }
    }, []);

    const validateToken = async (token) => {

        api.get('/auth/verifyToken', { headers: { 'auth-token': token } })
            .then((response) => {
                if (response.status === 200) {
                    history.push('/home');
                }
                else {
                    setNeedsLogin(true);
                }
            })
            .catch(e => {
                setNeedsLogin(true);
                console.log(e)
            })
    }

    const login = async () => {
        api.post('/auth/login', { username: username, password: password })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('auth-token', JSON.stringify(response.data));
                    history.push('/home');
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const btnLoginHandler = (e) => {
        e.preventDefault();
        login();
    };

    const usernameHandler = (e) => {
        setUsername(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    if (needsLogin) {
        return (
            <div className="col-12">
                <div className="row align-items-center justify-content-center mt-2">
                    <div className="col-md-6 col-12 text-center">
                        <img src={weskglogo} alt="WESKG" className="img-fluid logoimg" />
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <h2 className="col-6 col-md-3 text-center">Login</h2>
                </div>
                <form>
                    <div className="row justify-content-center">
                        <div className="form-group col-md-4 col-lg-3 col-8">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="text" className="form-control" onChange={usernameHandler} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="form-group col-md-4 col-lg-3 col-8">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={passwordHandler} />
                        </div>
                    </div>
                    <div className="row justify-content-center mt-2">
                        <div className="col-md-3 col-4">
                            <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={btnLoginHandler}>Log In</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    else {
        return (
            <div className="col-12">
                <div className="row justify-content-center align-content-center h-100">
                    <Digital size={50} color={'#343A40'} />
                </div>
            </div>
        );
    }
}

export default Login