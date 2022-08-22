import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { useState } from 'react';
import Login from './Login';

import { LoginContext } from './LoginContext';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import {  doc, updateDoc, serverTimestamp,setDoc  } from "firebase/firestore";
import { auth, db } from './firebase';
import Loading from './loading';

function App() {

  const [user,loading] = useAuthState(auth)

  const getUserById=async(user)=>{
    const userRef = doc(db, "users", user.uid);
      await setDoc (userRef, {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
        userName: user.displayName,

    });

  }
  useEffect(()=>{
    
    if(user) {
      console.log(user,"User Data")
      getUserById(user)
     
    }
    if(loading){
      <Loading/>
    }


  },[user])

  // const [userrr, setUserrr] = useState(false)
  return (
   
    <BrowserRouter>
      <div className="app">

        <LoginContext.Provider value={{user}}>
        {!user ? (<Login />)
          :
          (
            <div className='appBody'>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Chat />}></Route>
                <Route path="/group/:groupId" element={<Chat />}></Route>

              </Routes>

            </div>
          )}
        </LoginContext.Provider>

      </div>
    </BrowserRouter>

  );
}

export default App;
