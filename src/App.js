import React, { useEffect, useState } from 'react';
import Chatbox from "./components/Chatbox";
import Chats from "./components/Chats"
import Nav from "./components/Nav";
import './App.css';
import firebase, {firestore, db, auth} from "../src/config" 

import Modal from "react-modal";

Modal.setAppElement("#root");


function App() {
  const [chatInput, setChatInput] = useState({
    "chatText": "",
    "name":"",
    "time":0,
    "dateTime":"",
  });
  const [chatsList, setChatsList] = useState([]);

  const [user, setUser] = useState({
    "userName":"",
    "email": "",
    "password": "",
    "signedIn":false,
  });



  function handleChatInput(e) {
    const {name, value} = e.target;
    setChatInput((prev) => {
      return {...prev,
        [name] : value}
    });
  }

  function addToDB(mssgObj) {
    db.collection("newChats").add(mssgObj)
  }

  

  function handleSubmit(e) {
    e.preventDefault();
    if (chatInput.chatText === "")return
    
    chatInput.time = Date.now();
    chatInput.dateTime = Date().slice(0, 21)//((hrs%12)>=10?(hrs%12):"0"+(hrs%12))+":"+((min>=10? min:"0"+min))+(hrs >= 12 ? "pm":"am");
    setChatsList(prev=>{return([...prev, chatInput]);});
    addToDB(chatInput);
    setChatInput(prev=>{return {...prev, chatText:""}});
    
  }

  function fetchChats() {
    const chatsRef = db.collection("newChats").orderBy("time");
    chatsRef.onSnapshot((ss)=>{
      let arr = [];
      ss.forEach((doc)=>{
        arr.push(doc.data())
      })
      setChatsList(arr);
      scrollToBottom()
    });
  }

  function signUP(user) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      firebase.auth().currentUser.updateProfile({
                      displayName: user.userName,
                  });
      setUser((prev)=>{return{...prev, signedIn:true}})
    
    })
    .catch((error) => {
      var errorMessage = error.message
      alert(errorMessage);
    });
  }

  function signIn(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      setUser((prev)=>{return{...prev, signedIn:true}})
    })
    .catch((error) => {
      var errorMessage = error.message;
      alert(errorMessage);
    });
  }

  function logOut() {
    auth.signOut();
    setUser({"userName":"","email": "","password": ""})
  }

  function handleUserChange(e) {
    const {name, value} = e.target;
    setUser((prev)=>{
      return ({
        ...prev,
        [name] : value,
      });
    });
  }

  const actions = {
    "signUp": signUP,
    "signIn":signIn,
    "logOut": logOut,
    "handleUserChange":handleUserChange,
  };

  function scrollToBottom() {
    const lis = document.querySelector(".chatList");
    lis.scrollIntoView(false);
  }

  useEffect(() => {
    auth.onAuthStateChanged(currUser=>{
      if(currUser){
        setUser({"userName":currUser.displayName,"email": "","password": "", signedIn:true});
        setChatInput((prev)=>{return{...prev, name:currUser.displayName}})
        fetchChats();
        scrollToBottom();
      }
      })
  },[]);


  
  

  return (
    <div className="App">
    <Nav user={user} actions={actions} />
    {
      (user.signedIn) &&
    <>
    <Chats chatList={chatsList} user={user}/>
    <Chatbox onchange={handleChatInput} onclick={handleSubmit} text={chatInput.chatText}/>
    </> 
    }
    </div>
  );
}

export default App;
