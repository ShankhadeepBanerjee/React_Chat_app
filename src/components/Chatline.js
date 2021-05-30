import React from 'react';
import './Chatline.css';



function Chatline(props) {
    return(
        <li>
        <div className={"chatline "+((props.mssg.name === props.currentUser)?"user":"other")}>
            <h5>{props.mssg.name.slice(0, 30)}</h5>
            <p>{props.mssg.chatText}</p>
            <p className="time-stamp">{props.mssg.dateTime}</p>
        </div>
        </li>
    );
}


export default Chatline;