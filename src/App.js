import logo from './logo.svg';
import './App.css';
import PasswordIcon from '@mui/icons-material/Password';
import { ReactComponent as TFA } from './2fa.svg';
import { useState } from 'react';
import React from 'react'
import Select from 'react-select'
import { Button, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import firebase from "firebase/app";
import "firebase/auth";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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


function App() {
  
  const options = [
    { value: 'TOTP', label: 'TOTP-Custom' },
    { value: 'GA', label: 'Google Authenticator' },
    { value: 'SMSV', label: 'SMS Verification' },
  ]

  const [radioState, setRadioState] = useState("None")
  const [register, setRegister] = useState("register")
  const [open, setOpen] = React.useState(false)
  const [MFA, setMFA] = useState("")


  // Alert for credential registation on register button click
  const handleClick = () => {
    // setOpen(true);
    var mail = prompt("Type your email ID")
    var pwd = prompt("Type a new password")
    const auth = getAuth();
    console.log(auth)

    createUserWithEmailAndPassword(auth,mail,pwd)
      .then((credential) => {
        const user = credential.user
        alert("User Created successfully" + user.getIdToken)
        setRegister("Registered Succesfully")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
      })

  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  //SnackBar setup
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  //Top App Bar
  function AppBar() {
    return (
      <div className='appbar'>
        <div className='leftbar'>
          <PasswordIcon />
          <div className='titleTop'>Novichok</div>
        </div>
        <div className='rightbar'>
          <div className='downloads' onClick={handleClick}>{register}</div>
        </div>
      </div>
    )
  }

  //SVG Image on landing
  function LandingPage(){
    return(
      <div className='landing'>
        <div className='imageland'>
          <div className='svgholder'>
            <TFA/>
          </div>
        </div>

        <div className='textland'>
          <div className='textcont'>
            <div className='texttitle'>An Add-on MFA</div>
            <div className='textdesc'>A simple one time configurator providing extended MFA services for Linux systems. Supports wide range of linux editions including the enterprise ones.</div>
          </div>
        </div>
      </div>
    )
  }

  function Pagebreak(){
    return (
      <div className='pagebreak'>
        <div className='centerText'>More Details and a File</div>
      </div>
    )
  }

  function toLogin(email, pwd){
    const auth = getAuth()
    console.log(auth)
    alert(email + pwd)
    signInWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
      alert("Successful Login, Saving your prefered MFA. You'll get the file soon")
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  //To handle login and send to the api then get the file
  function handleMFAChange(event){
    const email = (event.target.elements.email.value)
    const pwd = (event.target.elements.pwd.value)
    const org = (event.target.elements.org.value)
    const mfa = (event.target.elements.mfa.value)
    toLogin(email, pwd)
    return

    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        alert("Successful Login, Saving your prefered MFA. You'll get the file soon")

        const storage = getStorage()
        const pathReference = ref(storage, 'debpacktest_1.0-2.deb')
        const gsReference = ref(storage, 'gs://bucket/debpacktest_1.0-2.deb')
        const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');  

        getDownloadURL(ref(storage, 'debpacktest_1.0-2.deb'))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            alert("Got the file")
          })
          .catch((error) => {
            // Handle any errors
            alert(error.message)
          });
      })
      .catch(error => {
        alert(error.message)
      })
      alert("Broken drum")
  }

  function GetFilePage() {
    return(
      <div className='getfile'>
        <div className='showdetails'>
          <div className='infoCard'>Various authentication mediator options are available. Multiple options can also be availed. Users can easily <span>personalise</span> their number and type of authenticaiton.</div>
          <div className='infoCard'>It is entirely an <span>"install and forget"</span> mechanism. The script that users get is designed for configuring hooked linux machines and modifying PAM.</div>
          <div className='infoCard'>Even if users are accomodated with <span>Identity providers</span> this service can be augmented without an external daemon.</div>
          <div className='infoCard'>The services lets the authentication to be split into pre authentication and validation part with <span>clear motives</span>.</div>
        </div>
        <div className='givedetails'>
          <form onSubmit={handleMFAChange}>
            <div className='formHeading'>Get add-on file</div>

            <input name="email" type='email' placeholder='Registered Mail ID'/><br/>
            <input name="pwd" type='password' placeholder='Registered Password'/><br/>
            <input name="org" type='text' placeholder='Organisation'/><br/>
            <Select name="mfa" className='selector' options={options}/>

            <button type="submit">Get File</button>
          </form>
        </div>
      </div>
    )
  }

  function SetupDetails(){
    return (
      <div className='setup'>
        <div className='terminal'>
          <div className='steps'><span>1. </span>Download the file</div>
          <div className='steps'><span>2. </span>Run the following commands</div>
          <div className='commands'><span className='redHash'># </span>sudo chmod +x novichok.sh</div>
          <div className='commands'><span className='redHash'># </span>sudo nano /etc/pam.d/common-auth</div>
          <div className='commands'><span className='redHash'># </span>sudo chmod +x novichok.sh</div>
          <div className='steps'><span>3. </span>Add the line</div>
          <div className='commands'>Auth  required.  Novichok.so</div>
        </div>
      </div>
    )
  }

  return (
    <div className="home">
      <AppBar/>
      <LandingPage/>
      <Pagebreak/>
      <SetupDetails/>
      <GetFilePage/>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Feature until development"
        action={action}
      />
    </div>
  );
}

export default App;
