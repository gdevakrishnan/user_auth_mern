import React, { Fragment, useEffect, useState } from 'react'
import { findAUserExistance } from '../services/ServiceWorkers';

function Login() {
    useEffect(() => {
        try {
            const token = localStorage.getItem('Authorization_Token');
            if (token) {
                console.log(token);   
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }, [])
    const initalState = { uname: "", gmail: "", pwd: "" };
    const [UserDetails, setUserDetails] = useState(initalState);

    const handleEdit = (e) => {
        setUserDetails({ ...UserDetails, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!(UserDetails.uname.trim() === "" || UserDetails.gmail.trim() === "" || UserDetails.pwd.trim() === "")) {
            findAUserExistance(UserDetails)
                .then((task) => {
                    if (task.status === 200) {
                        const { message, token } = task.data;
                        if (message === "Login Successfull") {
                            alert("Login Successfull");
                            localStorage.setItem("Authorization_Token", token);
                        } else if (response.message === "User not found") {
                            alert(response);
                        }
                    }
                })
                .catch((e) => console.log(e.message));

            setUserDetails(initalState);
        } else {
            alert('Enter all the fields');
        }
    }

    return (
        <Fragment>
            <form method='POST' >
                <div className="form_group">
                    <label htmlFor="uname">User Name</label>
                    <input
                        type='text'
                        name='uname'
                        id='uname'
                        onChange={(e) => handleEdit(e)}
                        value={UserDetails.uname}
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="gmail">Gmail</label>
                    <input
                        type='email'
                        name='gmail'
                        id='gmail'
                        onChange={(e) => handleEdit(e)}
                        value={UserDetails.gmail}
                    />
                </div>
                <div className="form_group">
                    <label htmlFor="pwd">Password</label>
                    <input
                        type='password'
                        name='pwd'
                        id='pwd'
                        onChange={(e) => handleEdit(e)}
                        value={UserDetails.pwd}
                    />
                </div>
                <input
                    type='submit'
                    value={'Login'}
                    onClick={(e) => handleSubmit(e)}
                />
            </form>
        </Fragment>
    )
}

export default Login;