import styles from "./styles.module.css";
import { useState, useEffect } from 'react';
import socket from '../Chats/connection.jsx';
import Seen from '../Seen/index.jsx';

function index({ chatData, userId }) {

  const [profile, setProfile] = useState(null);
  const [displayMessage, setDisplayMessage] = useState(null);
  const [time, setTime] = useState(null);


  const getProfile = async () => {
    try {
      const response = await fetch(`http://localhost:9000/whatsapp/getUserProfile?userId=${chatData._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      console.log("inside getProfile function")
      if (!response.ok) {
        if (response.status === 200) {
          setProfile(null);
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (response.headers.get('content-type')?.startsWith('image/')) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProfile(imageUrl);
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Error fetching about:', error);
      return "";
    }
  }

  const getLastMessage = async () => {
    // try {
    //   const response = await fetch(`http://localhost:9000/messages/lastMessage?receiverId=${chatData._id}&senderId=${senderId}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //   });
    console.log("getting last message");
    socket.emit("getLastMsg", { senderId: userId, receiverId: chatData._id });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setTime(data.createdAtFormatted)
    //   if (data.image) {
    //     setDisplayMessage(
    //       <span className={styles.lastMsg}>
    //         <svg
    //           viewBox="0 0 16 20"
    //           height="20"
    //           width="16"
    //           preserveAspectRatio="xMidYMid meet"
    //           version="1.1"
    //           x="0px"
    //           y="0px"
    //           enableBackground="new 0 0 16 20"
    //         >
    //           <title>status-image</title>
    //           <path fill="currentColor" d="M13.822,4.668H7.14l-1.068-1.09C5.922,3.425,5.624,3.3,5.409,3.3H3.531 c-0.214,0-0.51,0.128-0.656,0.285L1.276,5.296C1.13,5.453,1.01,5.756,1.01,5.971v1.06c0,0.001-0.001,0.002-0.001,0.003v6.983 c0,0.646,0.524,1.17,1.17,1.17h11.643c0.646,0,1.17-0.524,1.17-1.17v-8.18C14.992,5.191,14.468,4.668,13.822,4.668z M7.84,13.298 c-1.875,0-3.395-1.52-3.395-3.396c0-1.875,1.52-3.395,3.395-3.395s3.396,1.52,3.396,3.395C11.236,11.778,9.716,13.298,7.84,13.298z  M7.84,7.511c-1.321,0-2.392,1.071-2.392,2.392s1.071,2.392,2.392,2.392s2.392-1.071,2.392-2.392S9.161,7.511,7.84,7.511z"></path>
    //         </svg> {" "}
    //         Image
    //       </span>
    //     )
    //   }
    //   else {
    //     setDisplayMessage(data.text);
    //   }
    // } catch (error) {
    //   console.error('Error fetching about:', error);
    //   return "";
    // }
  }

  useEffect(() => {
    getProfile();
    getLastMessage();
  }, [chatData, userId]);

  useEffect(() => {
    function handleLastMsg(user) {
      console.log("handling last msg : ", user);
      if (
        (user.senderId === chatData._id.toString() && user.receiverId === userId.toString()) ||
        (user.senderId === userId.toString() && user.receiverId === chatData._id.toString())
      ) {
        if (user.image) {
          console.log("received msg is an image");
          setDisplayMessage(
            <span className={styles.lastMsg}>
              {user.senderId === userId.toString() && <Seen/> }
              <svg
                viewBox="0 0 16 20"
                height="20"
                width="16"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                x="0px"
                y="0px"
                enableBackground="new 0 0 16 20"
              >
                <title>status-image</title>
                <path fill="currentColor" d="M13.822,4.668H7.14l-1.068-1.09C5.922,3.425,5.624,3.3,5.409,3.3H3.531 c-0.214,0-0.51,0.128-0.656,0.285L1.276,5.296C1.13,5.453,1.01,5.756,1.01,5.971v1.06c0,0.001-0.001,0.002-0.001,0.003v6.983 c0,0.646,0.524,1.17,1.17,1.17h11.643c0.646,0,1.17-0.524,1.17-1.17v-8.18C14.992,5.191,14.468,4.668,13.822,4.668z M7.84,13.298 c-1.875,0-3.395-1.52-3.395-3.396c0-1.875,1.52-3.395,3.395-3.395s3.396,1.52,3.396,3.395C11.236,11.778,9.716,13.298,7.84,13.298z  M7.84,7.511c-1.321,0-2.392,1.071-2.392,2.392s1.071,2.392,2.392,2.392s2.392-1.071,2.392-2.392S9.161,7.511,7.84,7.511z"></path>
              </svg> {" "}
              Image
            </span>
          )  
        }
        else {
          console.log("received msg is an image");

          setDisplayMessage(
            <span className={styles.lastMsg}>
            {user.senderId === userId.toString() && <Seen/> }
            {user.text.length > 55 ? user.text.slice(0, 55) + "..." : user.text}
            </span>
          );    
          // setDisplayMessage(displayMessage.length > 35 ? `displayMessage.slice(0,35)...` : displayMessage)
        }
        setTime(user.createdAtFormatted)
      }
    }

    console.log("handling last message socket");
    socket.on("lastMsg", handleLastMsg);


    return () => {
      socket.off("lastMsg", handleLastMsg);
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <div className={styles.dp}>
          {profile === null ? <svg
            viewBox="0 0 212 212"
            height="49"
            width="49"
            style={{ borderRadius: "50%", boxShadow: "5px 0px 0px  #eae6df inherit" }}
            preserveAspectRatio="xMidYMid meet"
            className="xh8yej3 x5yr21d"
            version="1.1"
            x="0px"
            y="0px"
            enableBackground="new 0 0 212 212"
          >
            <title>Profile</title>
            <path fill="#DFE5E7" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z" className="xl21vc0"></path>
            <g>
              <path fill="#FFFFFF" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z" className="x1d6ck0k"></path>
              <path fill="#FFFFFF" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z" className="x1d6ck0k"></path>
            </g>
          </svg> :
            <img src={profile} className={styles.profile} alt="profile" />}
        </div>
        <div className={styles.info}>
          <div className={styles.nameDetails}>
            <div className={styles.name}>{chatData.username || "Unknown"}</div>
            <div className={styles.time}>{time}</div>
          </div>
          <div className={styles.msg}>
            {displayMessage}
            {/* <div className={styles.unread}>{unread}</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default index