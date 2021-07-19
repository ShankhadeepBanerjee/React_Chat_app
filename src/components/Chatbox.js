import React from 'react';
import './Chatbox.css';
import firebase, {firestore, storage} from "../config" 

function Chatbox(props){


    return(
      <div className="chatbox">
        <form action="" className="chatbox-form">
        <input className="chatbox-input" type="text" onChange={props.onchange} placeholder="Text" name="chatText" value={props.text} />
        {/* <input type="file" id="myFile" name="filename"/>
        <button onClick={handleFileUpload}>upload</button> */}
        <button onClick={props.onclick}>send</button>
      </form>
      </div>
    );
}


export default Chatbox;