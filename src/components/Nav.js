import React, { useState } from "react";
import Modal from "react-modal";
// import { auth } from "../config";
import "./Nav.css"




function Nav(props) {
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState("");

    function handleSubmit(e, type) {
        e.preventDefault();
        if (!(props.user.email && props.user.password))return
        (type === "Sign Up") ? props.actions.signUp(props.user): props.actions.signIn(props.user);
    }

    return (
    <div className="nav">
        {(!props.user.signedIn) ? 
        //if not signed in
        <><button type="button" onClick={()=>{setOpen(true); setOption("Sign In")}}>
            Sign In
        </button>
        <button type="button" onClick={()=>{setOpen(true); setOption("Sign Up")}}>
            Sign Up
        </button>
        </>
        :
        //If signed in
        <>
        <h3>User: <b>{props.user.userName}</b> </h3>
        <button type="button" onClick={(e)=>{setOption("Log Out"); props.actions.logOut()}}>
            Log Out
        </button>
        </>
        }
        
        <Modal
        isOpen={open}
        onRequestClose={()=>{setOpen(false)}}
        style={{
                content: {
                width: "50%",
                height: "50%",
                margin: "auto",
                }
            }}
        >


        <h1>{option}</h1>

        {/* //The Sign in or Sign Up form */}
        <form action="" className="auth">
            {(option === "Sign Up") && 
                <>
                <label htmlFor="userName">Username:</label>
                <input type="text" name="userName" value={props.user.userName} onChange={props.actions.handleUserChange} />
                </>
            }
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={props.user.email} onChange={props.actions.handleUserChange} />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" value={props.user.password} onChange={props.actions.handleUserChange}/>
            
            <button onClick={(e)=>{
                setOpen(false); handleSubmit(e, option)
                }}>{option}</button>
        </form>
        
        </Modal>
    </div>
    );
}



export default Nav;




