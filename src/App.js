import React, { useEffect, useState } from 'react';
import Chatbox from "./components/Chatbox"
import Chatline from "./components/Chatline"
import './App.css';
import firebase, {firestore, db} from "../src/config" 


function App() {
  let userName = "";
  const [chatInput, setChatInput] = useState({
    "chatText": "",
    "name":"",
    "time":0,
    "dateTime":"",
  });
  const [chatsList, setChatsList] = useState([]);

  


  function handleChatInput(e) {
    const {name, value} = e.target;
    setChatInput((prev) => {
      return {...prev,
        [name] : value}
    });
  }

  function addToDB(mssgObj) {
    db.collection("Chats").add(mssgObj)
    .then((docRef)=>{console.log(docRef.id);})
    .catch((error)=>{console.log("Erroe occured "+error);})
  }

  

  function handleSubmit(e) {
    e.preventDefault();
    if (chatInput.chatText === "")return
    let date = new Date();
    chatInput.time = Date.now();
    let hrs = date.getHours();
    let min = date.getMinutes();
    chatInput.dateTime = (hrs%12)+":"+(min)+(hrs >= 12 ? "am":"pm");
    setChatsList(prev=>{return([...prev, chatInput]);});
    addToDB(chatInput);
    setChatInput(prev=>{return {...prev, chatText:""}});
    
  }

  function askUsername() {
    userName = prompt("Enter Username: ");
    setChatInput((prev)=>{
      return {...prev, "name":userName};
    });
  }
  function fetchChats() {
    const chatsRef = db.collection("Chats").orderBy("time");
    chatsRef.onSnapshot((ss)=>{
      let arr = [];
      ss.forEach((doc)=>{
        arr.push(doc.data())
      })
      setChatsList(arr);
    });
  }

  
  useEffect(() => {
    askUsername();
    fetchChats();
    
  }, []);
  

  return (
    <div className="App">
      <ul>
        {chatsList.map((elem,index) => {
          return(<Chatline mssg={elem} key={index} id={index} currentUser={chatInput.name}/>)
        })}
      </ul>
    <Chatbox onchange={handleChatInput} onclick={handleSubmit} text={chatInput.chatText} name={chatInput.name}/>
    </div>
  );
}

export default App;
