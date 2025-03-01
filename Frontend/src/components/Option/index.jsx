import styles from "./styles.module.css";
import { useState } from "react";

import Status from '../Status/index.jsx'
import Channels from '../Channels/index.jsx'
import Communities from '../Communities/index.jsx'
import Meta from '../Meta/index.jsx'
import Settings from '../Settings/index.jsx'
import Profile from '../Profile/index.jsx'
import {Chats} from '../Chats/index.jsx'

// function Option({ onChatClick }) {
//   const back = (
//     <svg viewBox="0 0 24 24" height="24" width="24">
//       <title>back</title>
//       <path fill="currentColor" d="M10 6l-6 6 6 6 1.41-1.41L6.83 12l4.58-4.59z"></path>
//     </svg>
//   );
//   const [isFocused, setIsFocused] = useState(false);

//   const chatData = [
//     {
//       id: 1,
//       name: "Alice",
//       dp: <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="User 1" className={styles.chatDp} />,
//       messages: [
//         { sender: "Alice", text: "Hey! How are you?", time: "10:15 AM" },
//         { sender: "You", text: "I'm good! How about you?", time: "10:16 AM" },
//         { sender: "Alice", text: "Doing great! What’s up?", time: "10:17 AM" },
//       ],
//     },
//     {
//       id: 2,
//       name: "Kary",
//       dp: <img src="https://randomuser.me/api/portraits/women/3.jpg" alt="User 2" className={styles.chatDp} />,
//       messages: [
//         { sender: "Kary", text: "Let's meet up later!", time: "10:30 AM" },
//         { sender: "You", text: "Sure! What time?", time: "10:32 AM" },
//         { sender: "Kary", text: "Maybe around 5 PM?", time: "10:35 AM" },
//       ],
//     },
//     {
//       id: 3,
//       name: "Charlie",
//       dp: <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User 3" className={styles.chatDp} />,
//       messages: [
//         { sender: "Charlie", text: "Did you complete the project?", time: "11:00 AM" },
//         { sender: "You", text: "Almost! Just finishing up a few things.", time: "11:05 AM" },
//         { sender: "Charlie", text: "Great! Let me know if you need help.", time: "11:10 AM" },
//       ],
//     },
//     {
//       id: 4,
//       name: "David",
//       dp: <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="User 4" className={styles.chatDp} />,
//       messages: [
//         { sender: "David", text: "Hello", time: "11:00 AM" },
//         { sender: "You", text: "Hi, How are you doing?", time: "11:05 AM" },
//         { sender: "David", text: "Great! Let me know if you need help.", time: "11:10 AM" },
//         { sender: "You", text: "It's my pleasure to hear that!", time: "11:15 AM" },
//       ],
//     },
//     {
//       id: 5,
//       name: "Eve",
//       dp: <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="User 5" className={styles.chatDp} />,
//       messages: [
//         { sender: "Eve", text: "Hello...", time: "10:00 AM" },
//         { sender: "You", text: "Hi", time: "09:05 AM" },
//       ],
//     },
//     {
//       id: 6,
//       name: "Frank",
//       dp: <img src="https://randomuser.me/api/portraits/men/6.jpg" alt="User 6" className={styles.chatDp} />,
//       messages: [
//         { sender: "Frank", text: "Hey", time: "11:00 AM" },
//         { sender: "You", text: "Hello", time: "11:05 AM" },
//         { sender: "Frank", text: "How are you ?", time: "11:10 AM" },
//       ],
//     },
//     {
//       id: 7,
//       name: "Grace",
//       dp: <img src="https://randomuser.me/api/portraits/women/7.jpg" alt="User 7" className={styles.chatDp} />,
//       messages: [
//         { sender: "Grace", text: "Are you ok ?", time: "09:00 AM" },
//         { sender: "You", text: "Yeah ! what happened?", time: "06:05 PM" },
//       ],
//     },
//     {
//       id: 8,
//       name: "Hank",
//       dp: <img src="https://randomuser.me/api/portraits/men/8.jpg" alt="User 8" className={styles.chatDp} />,
//       messages: [
//         { sender: "Hack", text: "Hey! How are you?", time: "10:15 AM" },
//         { sender: "You", text: "I'm good! How about you?", time: "10:16 AM" },
//         { sender: "Hack", text: "Doing great! What’s up?", time: "10:17 AM" },
//       ],
//     },
//     {
//       id: 9,
//       name: "Ivy",
//       dp: <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="User 9" className={styles.chatDp} />,
//       messages: [
//         { sender: "Ivy", text: "Hey! How are you?", time: "09:25 AM" },
//         { sender: "You", text: "I'm good! How about you?", time: "10:45 AM" },
//         { sender: "Ivy", text: "Ok", time: "10:57 AM" },
//       ],
//     },
//     {
//       id: 10,
//       name: "Jack",
//       dp: <img src="https://randomuser.me/api/portraits/men/10.jpg" alt="User 10" className={styles.chatDp} />,
//       messages: [
//         { sender: "Jack", text: "Hey", time: "11:00 AM" },
//         { sender: "You", text: "Hello", time: "11:05 AM" },
//         { sender: "Jack", text: "How are you ?", time: "11:10 AM" },
//       ],
//     },
//     {
//       id: 11,
//       name: "Kathy",
//       dp: <img src="https://randomuser.me/api/portraits/women/11.jpg" alt="User 11" className={styles.chatDp} />,
//       messages: [
//         { sender: "Kathy", text: "Hey", time: "10:00 AM" },
//         { sender: "You", text: "Hello, How are you ?", time: "10:05 AM" },
//         { sender: "Kathy", text: "I am great !", time: "04:10 PM" },
//       ],
//     },
//     {
//       id: 12,
//       name: "Leo",
//       dp: <img src="https://randomuser.me/api/portraits/men/12.jpg" alt="User 12" className={styles.chatDp} />,
//       messages: [
//         { sender: "Grace", text: "Are you ok ?", time: "09:00 AM" },
//         { sender: "You", text: "Yeah ! what happened?", time: "06:05 PM" },
//         { sender: "Grace", text: "Nothing !", time: "08:00 PM" },
//       ],
//     },
//     {
//       id: 13,
//       name: "Nia",
//       dp: <img src="https://randomuser.me/api/portraits/women/13.jpg" alt="User 13" className={styles.chatDp} />,
//       messages: [
//         { sender: "Nia", text: "Hello", time: "11:00 AM" },
//         { sender: "You", text: "Hi, How are you doing?", time: "11:05 AM" },
//         { sender: "Nia", text: "Great! Let me know if you need help.", time: "11:10 AM" },
//       ],
//     },
//     {
//       id: 14,
//       name: "John",
//       dp: <img src="https://randomuser.me/api/portraits/men/14.jpg" alt="User 14" className={styles.chatDp} />,
//       messages: [
//         { sender: "Jack", text: "Hey", time: "11:00 AM" },
//         { sender: "You", text: "Hello", time: "11:05 AM" },
//         { sender: "Jack", text: "How are you ?", time: "11:10 AM" },
//         { sender: "You", text: "I am fine..what about you?", time: "12:05 PM" },
//       ],
//     },
//   ];
//   const [idx, setIdx] = useState(1);

//   return (
//     <div className={styles.container} >
//       <Head text="Chats" iconType="Archieved"/>
//       {/* <div className={`${styles.head} ${styles.chats}`}>
//         <div className={styles.heading}>
//           Chats
//         </div>
//         <div className={styles.heading}>
//           <div className={styles.icon}>
//             <Archieved />
//           </div>
//           <div className={styles.icon}>
//             <Menu />
//           </div>
//         </div>
//       </div> */}
//       <div className={`${styles.head} ${styles.searchBar}`}>
//         <div className={styles.lens}>
//           {isFocused ? back : <Lens />}
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder={isFocused ? "" : "Search"}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setTimeout(() => setIsFocused(false), 100)}
//           />
//         </div>
//       </div>
//       <div className={styles.filter}>
//         <Button>All</Button>
//         <Button>Unread</Button>
//         <Button>Favourites</Button>
//         <Button>Groups</Button>
//       </div>
//       {/* <div className={styles.contactList} key={idx} onClick={
//         (e)=>{
//           onChatClick(chatData[e.target.key])
//           setIdx(idx+1)
//           }}>
//       {chatData.map((chat, i) => (
//           <ShowContact key={i} chatData={chat} onChatClick={() => onChatClick(chat)} /> 
//         ))} */}
//       <div className={styles.contactList}>
//         {chatData.map((chat) => (
//           <div key={chat.id} onClick={() => onChatClick(chat)} className={styles.chatItem}>
//             {/* {chat.dp}
//             <div className={styles.chatInfo}>
//               <h4>{chat.name}</h4>
//               <p>{chat.message}</p>
//             </div>
//             <span className={styles.chatTime}>{chat.time}</span> */}
//             <ShowContact chatData={chat}/>
//           </div>
//         ))}
//         <div className={styles.endMessage}>
//           <div >
//             <Lock />
//           </div>
//           <div>
//             Your personal messages are <span className={styles.encryptionMsg}>end-to-end encrypted</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function Option({ onChatClick, option }) { // Receive option as prop
  return (
    <div className={styles.container}>
      

      {/* {option === "Chats" ? <Chats onChatClick={onChatClick} /> : <Status />}  */}
      {option === "Chats" && <Chats onChatClick={onChatClick} />}
      {option === "Status" && <Status />}
      {option === "Channels" && <Channels />}
      {option === "Communities" && <Communities />}
      {option === "Meta" && <Meta />}
      {option === "Settings" && <Settings />}
      {option === "Profile" && <Profile />}
    </div>
  );
}
