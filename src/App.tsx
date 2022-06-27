import React from "react";
import "./css/bootstrap.css";
import "./css/main.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./components/Form";
import ProgressBar from "./components/ProgressBar";

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBra0xHXsX1JBPQpyZtZ0hBgZQsiZmSxSQ",
  authDomain: "webar-app-5a2b2.firebaseapp.com",
  projectId: "webar-app-5a2b2",
  storageBucket: "webar-app-5a2b2.appspot.com",
  messagingSenderId: "1051601729797",
  appId: "1:1051601729797:web:5ba1929956914ac643df6c",
  measurementId: "G-JKY8JQK4VD"
})

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header firebaseApp={firebaseApp} auth={auth}/>
        <Form db={db} auth={auth}/>
        {/* <ProgressBar /> */}
      </div>
    );
  }
}

export default App;
