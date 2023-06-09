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
import { initializeApp, getApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createBrowserHistory } from 'history'
import { child, get, getDatabase, onValue, set } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCatMwzLeSG16AlEYxvj548t71eL6S1saM",
  authDomain: "novichokhub.firebaseapp.com",
  projectId: "novichokhub",
  storageBucket: "novichokhub.appspot.com",
  messagingSenderId: "151054528032",
  appId: "1:151054528032:web:18bedd63a4c369f99e1645",
  databaseURL: "https://novichokhub-default-rtdb.firebaseio.com/",
};

// Initialize Firebase

const createFirebaseApp = () => {
  try {
    return getApp();
  } catch (e) {
    return initializeApp(firebaseConfig);
  }
};

const app = createFirebaseApp()
const database = getDatabase(app)


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

  const isAuthenticated = localStorage.getItem("isAuthenticated")
  if(isAuthenticated !== "True"){
    console.log("yool")
    createBrowserHistory().push('/auth')
    window.location.reload()
  }

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

  function handleSignout(){
    const auth = getAuth()
    signOut(auth).then(()=>{
      alert("Signed out")
      localStorage.setItem("isAuthenticated", "False")
      window.location.reload()
    })
  }

  //Top App Bar
  function AppBar() {
    return (
      <div className='appbar'>
        <div className='leftbar'>
          <PasswordIcon />
          <div className='titleTop'>Novichok</div>
        </div>
        <div className='rightbar'>
          <div className='downloads'>Hello {localStorage.getItem("email")}</div>
          <div className='downloads' onClick={handleSignout}>signOut</div>
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

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //To handle login and send to the api then get the file
  function handleMFAChange(event){
    const storage = getStorage() 
    getDownloadURL(ref(storage, 'debpacktest_1.0-2.deb'))
      .then((url) => {
        setOpen(true)
        downloadURI(url, 'debpacktest_1.0-2.deb')
      })
      .catch((error) => {
        // Handle any errors
        alert(error.message)
      });
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
          <form name='fileForm'>
            <div className='formHeading'>Get add-on file</div>
            <Select name="mfa" className='selector' options={options}/>

            <button onClick={handleMFAChange} type="button">Get File</button>
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
          <div className='steps'><span>2. </span>Run the following command</div>
          <div className='commands'><span className='redHash'># </span>cd *file-directory*</div>
          <div className='commands'><span className='redHash'># </span>dpkg -i novichokMFA.deb</div>
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
        message="Got the File URL"
        action={action}
      />
    </div>
  );
}

export default App;
