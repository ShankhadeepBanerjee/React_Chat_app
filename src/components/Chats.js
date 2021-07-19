import React from "react";
import Chatline from "../components/Chatline";
import "./Chats.css"




function Chats(props) {
    return(
        <ul className="chatList">
        {props.chatList.map((elem,index) => {
          return(<Chatline mssg={elem} key={index} id={index} currentUser={props.user.userName}/>)
        })}
        <div className="padd"></div>
        </ul>
    );
    
}

export default Chats;
