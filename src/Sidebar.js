import React,{useEffect,useState,useContext} from 'react'
import "./Sidebar.css"
import SidebarChats from './SidebarChats'
import { collection, getDocs, onSnapshot } from "firebase/firestore"; 
import { auth, db } from './firebase';
import { signOut } from 'firebase/auth';
import { LoginContext } from './LoginContext';


export default function Sidebar() {
  const{user} = useContext( LoginContext)


  const logOut = () => {
  
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("successful")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }

  const [group,setGroup] = useState([])

  const getGroups=async() =>{
    const getData = onSnapshot(collection(db,"groups"),(snapshot)=>{
      let list =[]; 
      snapshot.docs.forEach((doc)=>{
        list.push({
          id:doc.id,
          ...doc.data()
        })
      });
      setGroup(list)
    }) 
  
  }

  useEffect(()=>{
    getGroups()
  },[])
  return (
    <div className="sidebar">
    {/* {..header} */}
    <div className="sidebarHeader" >
     
        <div onClick={logOut} style={{ border:"2px solid silver ",borderRadius:"7px"}}>
          <span style={{display:"flex", borderRadius:"7px"}} >
          <img src={user.photoURL} alt="" style={{borderRadius:"7px", marginRight:"2px"}}/>
            <h3>{user.displayName}</h3>

          </span>
            
        </div>
        <div className="sidebarHeaderright">
           <button style={{border:"none"}}><span className="material-symbols-outlined">
            radio_button_unchecked
            </span></button> 
            <button style={{border:"none"}}><span className="material-symbols-outlined">
              more_vert
            </span></button> 
            <button style={{border:"none"}}><span className="material-symbols-outlined">
            chat
            </span></button> 
        </div>
    </div>
    {/* {....Sidebar search} */}

    <div className="sidebarSearch">
      <div className="sidebarSearchContainer">
      <span className="material-symbols-outlined">
        search
        </span>
        <input type="text" placeholder='search contact' />
      </div>
    </div>
    {/* {side bar chats} */}
    <div className="sidebarChats">
    <SidebarChats addNewChat/>
    {
      group.map((group)=>{
        return (
          <SidebarChats  key={group.id} name={group.name} id={group.id} />
        )
      })
    }


    </div>
    </div>
  )
}
 