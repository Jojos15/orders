import React, { useState } from 'react';
import api from '../api/api'
import weskglogo from '../img/weskglogo.png'

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        console.log({ username, password });
        api.post('/users/login', { username: username, password: password })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('auth-token', JSON.stringify(response.data));
                    console.log(response.message);
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

export default Login