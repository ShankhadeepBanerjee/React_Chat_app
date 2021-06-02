import React from 'react';
import './Chatbox.css';


function Chatbox(props){
    return(
      <div className="chatbox">
        <form action="" className="chatbox-form">
        <input className="chatbox-input" type="text" onChange={props.onchange} placeholder="Text" name="chatText" value={props.text} />
        <button onClick={props.onclick}>send</button>
      </form>
      </div>
    );
}


export default Chatbox;