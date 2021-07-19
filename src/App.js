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
  });

  const [signedIN, setSignedIN] = useState(false)



  function handleChatInput(e) {
    const {name, value} = e.target;
    setChatInput((prev) => {
      return {...prev,
        [name] : value}
    });
  }

  function addToDB(mssgObj) {
    db.collection("Chats").add(mssgObj)
  }

  

  function handleSubmit(e) {
    e.preventDefault();
    if (chatInput.chatText === "")return
    chatInput.name = auth.currentUser.displayName;
    chatInput.time = Date.now();
    chatInput.dateTime = Date().slice(0, 21)//((hrs%12)>=10?(hrs%12):"0"+(hrs%12))+":"+((min>=10? min:"0"+min))+(hrs >= 12 ? "pm":"am");
    setChatsList(prev=>{return([...prev, chatInput]);});
    addToDB(chatInput);
    setChatInput(prev=>{return {...prev, chatText:""}});
    
  }

  function fetchChats() {
    const chatsRef = db.collection("Chats").orderBy("time");
    let arr = [];
    chatsRef.onSnapshot((ss)=>{
      ss.forEach((doc)=>{
        arr.push(doc.data())
      })
      setChatsList(arr);
      scrollToBottom()
    });
  }

  function signUP(user) {
    auth.createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
    setSignedIN(true);
    return userCredential.user.updateProfile({
      displayName: user.userName,
    })
    }
    )
    .catch((error) => {
      var errorMessage = error.message
      alert(errorMessage);
      setUser({"userName":"","email": "","password": "",})
    });
  }

  function signIn(user) {
    auth.signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      console.log(userCredential);
      setSignedIN(true);
    })
    .catch((error) => {
      var errorMessage = error.message;
      alert(errorMessage);
      setUser({"userName":"","email": "","password": "",})
    });
    
  }

  function logOut() {
    auth.signOut();
    setSignedIN(false)
    setUser({"userName":"","email": "","password": "",})
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
    "userSetter": setUser,
    "inputSetter": setChatInput
  };

  function scrollToBottom() {
    const lis = document.querySelector(".chatList");
    lis && lis.scrollIntoView(false);
  }

  const [currentUser, setCurrentUser] = useState(null)


  useEffect(() => {    
      auth.onAuthStateChanged(currUser=>{
      if(currUser){
        setCurrentUser(currUser);
        fetchChats();
        scrollToBottom();
        // setSignedIN(true)
        console.log(currUser, "This is 11111");
      }else{
        setCurrentUser(null);
        // setSignedIN(false)
      }
     })
  },[]);

  // useEffect(() => {
  //   fetchChats();
  //   scrollToBottom();
  //   console.log(user.userName);
  // }, [signedIN === true])


  
  

  return (
    <div className="App">
    <Nav user={user} currUser={currentUser} actions={actions} />
    {
      (currentUser) &&
    <>
    <Chats chatList={chatsList} user={user}/>
    <Chatbox onchange={handleChatInput} onclick={handleSubmit} text={chatInput.chatText}/>
    </> 
    }
    </div>
  );
}

export default App;
