import React, { useState } from 'react'
import './auth.css';
import PasswordIcon from '@mui/icons-material/Password';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { createBrowserHistory } from 'history'

const firebaseConfig = {
    apiKey: "AIzaSyCatMwzLeSG16AlEYxvj548t71eL6S1saM",
    authDomain: "novichokhub.firebaseapp.com",
    projectId: "novichokhub",
    storageBucket: "novichokhub.appspot.com",
    messagingSenderId: "151054528032",
    appId: "1:151054528032:web:18bedd63a4c369f99e1645"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function Auth() {

    const [pageOptions, setPageOptions] = useState(['login', 'register'])

    function authSetter(){
        localStorage.setItem("isAuthenticated", "True")
    }

    function handleLogin(){
        const mail = (document.forms['loginForm'].elements['email'].value)
        const pwd = (document.forms['loginForm'].elements['pwd'].value)
        const auth = getAuth()
        console.log(auth)
        signInWithEmailAndPassword(auth, mail, pwd)
        .then((userCredential) => {
            alert("Successful Login!")
            localStorage.setItem("isAuthenticated", "True")
            localStorage.setItem("email", userCredential.user.email)
            createBrowserHistory().push('/')
            window.location.reload()
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    function changeOption(){
        setPageOptions([pageOptions[1], pageOptions[0]])
    }

      // Alert for credential registation on register button click
    const handleRegister = (event) => {
        console.log("here at the method")
        const mail = (document.forms['registerForm'].elements['email'].value)
        const pwd = (document.forms['registerForm'].elements['pwd'].value)
        const auth = getAuth();
        console.log(mail, pwd)

        createUserWithEmailAndPassword(auth,mail,pwd)
        .then((credential) => {
            const user = credential.user
            alert("User Created successfully")
            window.location.reload()
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            alert(errorMessage)
        })
        return false
    };

    //Top App Bar
    function AppBar() {
        return (
        <div className='appbar'>
            <div className='leftbar'>
                <PasswordIcon />
                <div className='titleTop'>Novichok</div>
            </div>
            <div className='rightbar'>
                <div className='downloads' onClick={changeOption}>{pageOptions[0]}</div>
            </div>
        </div>
        )
    }

    function Login(){
        return(
            <div className="loginForm">
                <form name='loginForm'>
                    <div className = 'formHeading'>Login</div>

                    <input name="email" type='email' placeholder='Registered Mail ID'/><br/>
                    <input name="pwd" type='password' placeholder='Registered Password'/><br/>
                    <button onClick={(e) =>handleLogin(e)} type='button'>Login</button>
                </form>
            </div>
        )
    }

    function Register(){
        return(
            <div className="loginForm">
                <form name='registerForm'>
                    <div className = 'formHeading'>Register</div>

                    <input name="email" type='email' placeholder='Registered Mail ID'/><br/>
                    <input name="pwd" type='password' placeholder='Registered Password'/><br/>
                    <button onClick={(e) =>handleRegister(e)} type='button'>Register</button>
                </form>
            </div>
        )
    }

    return (
        <div className='auth'>
            <AppBar/>
            <div className="content">
                {(pageOptions[0] === 'login') ? <Login/> : <Register/>}
            </div>
        </div>
    )
}
