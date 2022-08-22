import React,{useEffect, useState,useContext} from 'react'
import "./Chat.css"
import {useParams} from "react-router-dom";
import {db} from "./firebase";
import {addDoc, collection,doc,onSnapshot, orderBy, query, serverTimestamp} from "firebase/firestore";
import { LoginContext } from './LoginContext';
export default function Chat() {
    const {groupId} = useParams();
    const [groupName, setGroupName]= useState();
    const [input, setInput]= useState("");
    const [messages, setMessages]= useState([]);
    const{user} = useContext( LoginContext)
    const a = user.displayName;

    useEffect(()=>{
        if(groupId){
            const getGroup = onSnapshot(doc(db,"groups",groupId),(doc)=>{
                    setGroupName(doc.data().name)
            });
            const q = query(collection(db,"groups",groupId,"messages"),
            orderBy("timeStamp","asc"))
            const getMessage = onSnapshot(q,(snapshot)=>{
                    let msgList = [];
                    snapshot.docs.forEach((doc)=>{
                        msgList.push({
                            ...doc.data()
                        })
                    })
                    setMessages(msgList);
            })
        }
    },[groupId]);

    const sendMessage =async(e)=>{

        e.preventDefault()
        if(input == ""){
            return alert("please enter message")
        }
        {
        try{
            const sendData = await addDoc(collection(db,"groups",groupId,"messages"),{
                message: input,
                name:user.displayName,
                timeStamp:serverTimestamp(),
            });
        }catch(e){
            console.log("error",e)
        }}
        setInput("") }

    return (
        <div className='chat'>
            {/* {chat header} */}
            <div className="chatHeader">
                <img src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
                 alt='' />
            <div className='chatHeaderInfo'>
                <h3>{groupName}</h3>
                <p>Last seen at {" "} {
                    new Date(messages[messages.length - 1]?.timeStamp?.toDate()).toUTCString()
                }</p>
            </div>
            <div className="chatHeaderRight">
                <button style={{border:"none"}}>
                <span className="material-symbols-outlined">
                    search
                </span>
                </button>
                <button style={{border:"none"}}>
                <span className="material-symbols-outlined">
                    attach_file
                </span>
                </button>
                <button style={{border:"none"}}>
                <span className="material-symbols-outlined">
                    more_vert
                </span>
                </button> 
            </div>
            </div>
            {/* {.......chatBody} */}
            <div className="chatBody">
                {messages.map((message,index)=>{
                    return(<div key={index}>
                    
                    <p className={`chatMessage ${message.name == a && "chatReceiver "}`}  >
                    <span className='chatName'>{message.name}</span>
                    {message.message}
                    <span className='timestamp'>{new Date(message.timeStamp?.toDate()).toUTCString()}</span>
                </p>
                </div>

                )
                })}
                
               
            </div>
                {/* {...Chat Footer} */}
            <div className="chatFooter">
                <span className="material-symbols-outlined">
                    add_reaction
                </span>
                <form onSubmit={(e)=>{sendMessage(e)}}>
                    <input value={input}
                     onChange={(e)=>{setInput(e.target.value)}} 
                    type="text" placeholder="type a message" />
                    <button type="submit" style={{border:"none"}}>
                        <span className="material-symbols-outlined">
                        send
                    </span></button>
                    <button type="" style={{border:"none"}}><span className="material-symbols-outlined">
                            mic
                    </span></button>


                </form>
            </div>
        </div>
    )
}
