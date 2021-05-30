import React from 'react';
import './Chatbox.css';


function Chatbox(props){
    return(
        <form action="" className="chatbox">
        <input type="text" onChange={props.onchange} placeholder="Text" name="chatText" value={props.text} />
        {/* <input type="text" onChange={props.onchange} placeholder="Sender" name="name" value={props.name} /> */}
        <button onClick={props.onclick}>send</button>
      </form>
    );
}


export default Chatbox;