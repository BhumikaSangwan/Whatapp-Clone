import { useState, useEffect, useRef } from "react";
import { useLayoutEffect } from "react";
import styles from "./styles.module.css";
import Lens from "../Lens/index.jsx";
import Menu from "../Menu/index.jsx";
import Add from "../Add/index.jsx";
import Lock from "../Lock/index.jsx";
import Seen from "../Seen/index.jsx";
import TailIn from "../Tail/tailIn.jsx";
import TailOut from "../Tail/tailOut.jsx";
import socket from '../Chats/connection.jsx';


function Details({ selectedChat, me }) {
  const [animate, setAnimate] = useState(false);

  // useEffect(() => {
  //   console.log("[Details] socket.current is:", socket);

  //   socket.on('connect', () => {
  //     console.log('Connected to socket with ID:', socket.id);
  //   });

  //   return () => {
  //     socket.off('connect');
  //   };
  // }, []);


  useEffect(() => {
    if (selectedChat) {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 50);
    }
  }, [selectedChat]);



  return selectedChat ? (
    <Clicked chatData={selectedChat} me={me} />
  ) : (
    <Download />
  );
}

function Clicked({ chatData, me }) {

  const getProfile = async () => {
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Fetches the profile picture of the user with given userId
   * @function getProfile
   * @returns {Promise<void>}
   * @throws {Error} HTTP error! Status: ${response.status}
   */
/******  8c945c14-9d4b-4d00-aed7-cc57f1fe58f9  *******/    try {
      const response = await fetch(`http://localhost:9000/whatsapp/getUserProfile?userId=${chatData._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
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

  useEffect(() => {
    if (chatData && chatData._id) {
      getProfile();
    }
  }, [chatData?._id]);

  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");
  const [chatBody, setChatBody] = useState([]);
  const [basicInfo, setBasicInfo] = useState('click here for contact info');
  const imageInputRef = useRef(null);
  const [isPreviewHidden, setIsPreviewHidden] = useState(true);
  const [isEmojiHidden, setIsEmojiHidden] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const chatEndRef = useRef(null);

  const close = <svg
    viewBox="0 0 24 24"
    height="24"
    width="24"
    preserveAspectRatio="xMidYMid meet"
    fill="currentColor"
    enableBackground="new 0 0 24 24"
  >
    <title>x</title>
    <path d="M19.6004 17.2L14.3004 11.9L19.6004 6.60005L17.8004 4.80005L12.5004 10.2L7.20039 4.90005L5.40039 6.60005L10.7004 11.9L5.40039 17.2L7.20039 19L12.5004 13.7L17.8004 19L19.6004 17.2Z"></path>
  </svg>
  const emojis = [
    "😀", "😃", "😄", "😁", "😆", "🥹", "😅", "😂", "🤣", "🥲", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘",
    "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "🙂‍↕️", "😏", "😒", "🙂‍↔️", "😞",
    "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶",
    "😶‍🌫️", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🫣", "🤭", "🫢", "🫡", "🤫", "🫠", "🤥", "😶", "🫥", "😐", "🫤", "😑",
    "🫨", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😮‍💨", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧",
    "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸",
    "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "🫶", "🤲", "👐", "🙌", "👏", "🤝", "👍", "👎", "👊", "✊", "🤛", "🤜", "🫷",
    "🤞", "✌️", "🫰", "🤟", "🤘", "👌", "🤌", "🤏", "🫳", "🫴", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐️", "🖖", "👋",
    "🤙", "🫲", "🫱", "💪", "🦾", "✍️", "🙏", "👁️", "👀", "🫀", "🫁", "🧠", "🗣️", "👤", "👥", "🫂", "👶", "👧", "🧒", "👦",
    "👩", "🧑", "👨", "👩‍🦱", "🧑‍🦱", "👱‍♀️", "👱", "🤦‍♀️", "🤦‍♂️", "🤷‍♀️", "💁‍♀️", "💁"
  ];

  const [sendIcon, setSendIcon] = useState(<svg
    viewBox="0 0 24 24"
    height="24"
    width="24"
    preserveAspectRatio="xMidYMid meet"
    version="1.1"
    x="0px"
    y="0px"
    enableBackground="new 0 0 24 24"
  >
    <title>ptt</title>
    <path
      fill="currentColor"
      d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
    ></path>
  </svg>);

  useEffect(() => {
    scrollToBottom();
  }, [chatBody]);

  useLayoutEffect(() => {
    if (!chatEndRef.current) return;

    // Initial scroll
    scrollToBottom();

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    socket.on("isOnline", (data) => {
      if (data) {
        setBasicInfo('online');
      }
      else {
        setBasicInfo('click here for contact info')
      }
    })

    return () => {
      socket.off("isOnline");
    }
  }, [])


  useEffect(() => {
    if (!chatData || !me[0]) return;

    socket.emit("getMissedMessages", {
      senderId: chatData._id,
      receiverId: me[0]._id,
    });

    const handleMissedMessages = (messages) => {
      setChatBody((prev) => [...prev, ...messages]);
      scrollToBottom();
    };

    socket.on("missedMessages", handleMissedMessages);

    return () => {
      socket.off("missedMessages", handleMissedMessages);
    };
  }, [chatData._id, me]);


  useEffect(() => {
    const handleNewMessage = ({ senderId, receiverId, text, createdAtFormatted }) => {
      if (senderId === chatData._id.toString() && receiverId === me[0]._id.toString()) {
        setChatBody((prevChatBody) => [...prevChatBody, { senderId, receiverId, text, createdAtFormatted }]);
      }
    };

    socket.on("getMessage", handleNewMessage);

    return () => {
      socket.off("getMessage", handleNewMessage);
    };
  }, [chatData._id, me]);

  useEffect(() => {
    const handleNewImage = ({ senderId, receiverId, image, createdAtFormatted }) => {

      if (senderId === chatData._id.toString() && receiverId === me[0]._id.toString()) {
        setChatBody((prevChatBody) => [...prevChatBody, { senderId, receiverId, image, createdAtFormatted }]);
      }
    }

    socket.on("getImage", handleNewImage);

    return () => {
      socket.off("getImage", handleNewImage);
    }
  }, [chatData._id, me]);



  useEffect(() => {
    if (!chatData || !me[0]) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:9000/messages/?receiverId=${chatData._id}&senderId=${me[0]._id}`, {
          credentials: "include"
        });

        if (response.ok) {
          let data = await response.json();
          socket.emit("checkOnline", chatData._id);
          setChatBody(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chatData._id, me]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
    }
  };


  const sendMessage = async () => {
    try {
      handleSendIcon();
      const senderId = me[0]._id;
      const receiverId = chatData._id;
      const text = msg.trim();
      const time = getCurrentTimeInHoursAndMinutes()

      setIsEmojiHidden(true);
      if (text) {
        console.log("msg to be sent : ", text);
        socket.emit("sendMessage", { senderId, receiverId, text, createdAtFormatted: time }, (response) => {
          if (response.success) {
            // Only append if server saved successfully
            setChatBody((prevChatBody) => [
              ...prevChatBody,
              {
                senderId,
                receiverId,
                text,
                createdAtFormatted: time,
              },
            ]);

            socket.emit("getLastMsg", { senderId, receiverId });
            setMsg("");
          } else {
            console.error("Message not saved:", response.message);
          }
        });
      }
      else if (imageUrl) {
        handleSendImage();
      }

    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  function getCurrentTimeInHoursAndMinutes() {
    let date = new Date();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`
  }

  function handleSendIcon() {
    if (msg.trim() !== "" || imageUrl) {
      setSendIcon(
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enableBackground="new 0 0 24 24"
        >
          <title>send</title>
          <path
            fill="currentColor"
            d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
          ></path>
        </svg>
      );
    } else {
      setSendIcon(
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enableBackground="new 0 0 24 24"
        >
          <title>ptt</title>
          <path
            fill="currentColor"
            d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
          ></path>
        </svg>
      );
    }
  };

  function showImagePreview() {
    const image = imageInputRef.current.files[0];
    if (image) {
      setIsPreviewHidden(false);
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      setSendIcon(
        <svg
          viewBox="0 0 24 24"
          height="24"
          width="24"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enableBackground="new 0 0 24 24"
        >
          <title>send</title>
          <path
            fill="currentColor"
            d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
          ></path>
        </svg>
      );
    }
  }

  function closePreview() {
    setIsPreviewHidden(true);
    setImageUrl(null);
    setSendIcon(
      <svg
        viewBox="0 0 24 24"
        height="24"
        width="24"
        preserveAspectRatio="xMidYMid meet"
        version="1.1"
        x="0px"
        y="0px"
        enableBackground="new 0 0 24 24"
      >
        <title>ptt</title>
        <path
          fill="currentColor"
          d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
        ></path>
      </svg>
    );

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  }

  const handleSendImage = async () => {
    try {
      const senderId = me[0]._id;
      const receiverId = chatData._id;
      const file = imageInputRef.current.files[0];
      const time = getCurrentTimeInHoursAndMinutes()

      if (file) {
        const formData = new FormData();
        formData.append('messages', file);
        formData.append('senderId', senderId);
        formData.append('receiverId', receiverId);
        formData.append('createdAtFormatted', time);

        const response = await fetch('http://localhost:9000/whatsapp/imageMsg', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          socket.emit("sendImage", { senderId, receiverId, image: data.image, createdAtFormatted: time });
          socket.emit("getLastMsg", { senderId, receiverId });

          setIsPreviewHidden(true);
          setChatBody((prevChatBody) => [...prevChatBody, { senderId, receiverId, image: data.image, createdAtFormatted: time }]);
          setImageUrl(null);
          setSendIcon(
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              preserveAspectRatio="xMidYMid meet"
              version="1.1"
              x="0px"
              y="0px"
              enableBackground="new 0 0 24 24"
            >
              <title>ptt</title>
              <path
                fill="currentColor"
                d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"
              ></path>
            </svg>
          );
        } else {
          console.error("Image upload failed");
        }
      }
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending image:", error.message);
    }
  };

  const chooseSendImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const changeEmojiState = () => {
    setIsEmojiHidden(!isEmojiHidden);
  }

  const addEmoji = (emoji) => {
    setMsg((prev) => prev + emoji);
    handleSendIcon();
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.showDP}>
          {profile === null ? <svg
            viewBox="0 0 212 212"
            preserveAspectRatio="xMidYMid meet"
            className={styles.userProfile}
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
            <img src={profile} alt="profile" className={styles.userProfile} />
          }
        </div>
        <div className={styles.showBasics}>
          <div className={styles.name}>{chatData.username}</div>
          <div className={styles.basicInfo}>
            {basicInfo}
          </div>
        </div>
        <div className={`${styles.others} ${styles.commonStyle}`}>
          <div className={`${styles.call} ${styles.commonStyle}`}>
            <div className={styles.videoCall}>
              <svg
                viewBox="0 0 24 24"
                height="24"
                width="24"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
              >
                <title>video-call</title>
                <path
                  d="M3.27096 7.31042C3 7.82381 3 8.49587 3 9.84V14.16C3 15.5041 3 16.1762 3.27096 16.6896C3.5093 17.1412 3.88961 17.5083 4.35738 17.7384C4.88916 18 5.58531 18 6.9776 18H13.1097C14.502 18 15.1982 18 15.7299 17.7384C16.1977 17.5083 16.578 17.1412 16.8164 16.6896C17.0873 16.1762 17.0873 15.5041 17.0873 14.16V9.84C17.0873 8.49587 17.0873 7.82381 16.8164 7.31042C16.578 6.85883 16.1977 6.49168 15.7299 6.26158C15.1982 6 14.502 6 13.1097 6H6.9776C5.58531 6 4.88916 6 4.35738 6.26158C3.88961 6.49168 3.5093 6.85883 3.27096 7.31042Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M18.7308 9.60844C18.5601 9.75994 18.4629 9.97355 18.4629 10.1974V13.8026C18.4629 14.0264 18.5601 14.2401 18.7308 14.3916L20.9567 16.3669C21.4879 16.8384 22.3462 16.4746 22.3462 15.778V8.22203C22.3462 7.52542 21.4879 7.16163 20.9567 7.63306L18.7308 9.60844Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className={styles.dir}>
              <span
                aria-hidden="true"
                data-icon="chevron"
                className="x1rg5ohu x1iffjtl"
              >
                <svg
                  viewBox="0 0 30 30"
                  height="10"
                  preserveAspectRatio="xMidYMid meet"
                  x="0px"
                  y="0px"
                >
                  <title>chevron</title>
                  <path
                    fill="currentColor"
                    d="M11,21.212L17.35,15L11,8.65l1.932-1.932L21.215,15l-8.282,8.282L11,21.212z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div>
            <Lens style={{ width: "35px", height: "35px" }} />
          </div>
          <div>
            <Menu className={`${styles.menu} ${styles.commonStyle}`} />
          </div>
        </div>
      </div>

      {/* Body */}

      <div className={styles.body}>
        <div className={styles.description} id="chatBody" ref={chatEndRef}>
          {chatBody.map((msg, index) => (
            <div key={index} >
              <span >
                {msg.senderId === me[0]._id.toString() ? (
                  <div className={`${styles.alignMsg} ${styles.alignRight}`}>
                    <div className={styles.showMsg} >
                      <span className={styles.msg}>
                        {msg.image ? (
                          <img src={`http://localhost:9000${msg.image}`} alt="message image" className={styles.msgImage} />
                        ) :
                          <span className={styles.msgText}>{msg.text}</span>
                        }
                        <span className={styles.msgTime}>{msg.createdAtFormatted}</span>
                        <Seen />
                      </span>
                      <TailOut />
                    </div>
                  </div>
                ) : (
                  <div className={styles.alignMsg}>
                    <div className={`${styles.showMsg} ${styles.alignLeft}`}>
                      <TailIn />
                      <span className={styles.msg}>
                        {msg.image ? (
                          <img src={`http://localhost:9000${msg.image}`} alt="message image" className={styles.msgImage} />
                        ) :
                          <span className={styles.msgText}>{msg.text}</span>
                        }
                        <span className={styles.msgTime}>{msg.createdAtFormatted}</span>
                      </span>
                    </div>
                  </div>
                )}
              </span>
            </div>
          ))}

          <div style={{ display: isPreviewHidden ? "none" : "block" }}>
            <div className={styles.preview}>
              <div className={styles.previewImg}>
                {imageUrl && <img src={imageUrl} alt="Preview" />}
              </div>
              <div className={styles.closePreview} onClick={closePreview}>
                {close}
              </div>
            </div>
          </div>

          <div style={{ display: isEmojiHidden ? "none" : "block" }}>
            <div className={styles.emojiContainer}>
              <div className={styles.emojiField}>
                {emojis.map((emoji, index) => (
                  <span
                    key={index}
                    onClick={() => addEmoji(emoji)}
                    className={styles.selectedEmoji}>
                    {emoji}
                  </span>
                ))}
              </div>
              <div onClick={changeEmojiState}>
                {close}
              </div>
            </div>
          </div>
        </div>

        <input
          type="file"
          accept='image/*'
          name='messages'
          ref={imageInputRef}
          id={styles.inputImage}
          onChange={showImagePreview}
        />

        <div className={styles.foot}>
          <div className={styles.attach}>
            <div onClick={chooseSendImage}>
              <Add />
            </div>
          </div>
          <div className={styles.chatBoard}>
            <div className={styles.keyboard}>
              <div className={styles.emojiIcon} onClick={changeEmojiState}>
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  fill="none"
                >
                  <title>expressions</title>
                  <path d="M8.49893 10.2521C9.32736 10.2521 9.99893 9.5805 9.99893 8.75208C9.99893 7.92365 9.32736 7.25208 8.49893 7.25208C7.6705 7.25208 6.99893 7.92365 6.99893 8.75208C6.99893 9.5805 7.6705 10.2521 8.49893 10.2521Z" fill="currentColor"></path>
                  <path d="M17.0011 8.75208C17.0011 9.5805 16.3295 10.2521 15.5011 10.2521C14.6726 10.2521 14.0011 9.5805 14.0011 8.75208C14.0011 7.92365 14.6726 7.25208 15.5011 7.25208C16.3295 7.25208 17.0011 7.92365 17.0011 8.75208Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M16.8221 19.9799C15.5379 21.2537 13.8087 21.9781 12 22H9.27273C5.25611 22 2 18.7439 2 14.7273V9.27273C2 5.25611 5.25611 2 9.27273 2H14.7273C18.7439 2 22 5.25611 22 9.27273V11.8141C22 13.7532 21.2256 15.612 19.8489 16.9776L16.8221 19.9799ZM14.7273 4H9.27273C6.36068 4 4 6.36068 4 9.27273V14.7273C4 17.6393 6.36068 20 9.27273 20H11.3331C11.722 19.8971 12.0081 19.5417 12.0058 19.1204L11.9935 16.8564C11.9933 16.8201 11.9935 16.784 11.9941 16.7479C11.0454 16.7473 10.159 16.514 9.33502 16.0479C8.51002 15.5812 7.84752 14.9479 7.34752 14.1479C7.24752 13.9479 7.25585 13.7479 7.37252 13.5479C7.48919 13.3479 7.66419 13.2479 7.89752 13.2479L13.5939 13.2479C14.4494 12.481 15.5811 12.016 16.8216 12.0208L19.0806 12.0296C19.5817 12.0315 19.9889 11.6259 19.9889 11.1248V9.07648H19.9964C19.8932 6.25535 17.5736 4 14.7273 4ZM14.0057 19.1095C14.0066 19.2605 13.9959 19.4089 13.9744 19.5537C14.5044 19.3124 14.9926 18.9776 15.4136 18.5599L18.4405 15.5576C18.8989 15.1029 19.2653 14.5726 19.5274 13.996C19.3793 14.0187 19.2275 14.0301 19.0729 14.0295L16.8138 14.0208C15.252 14.0147 13.985 15.2837 13.9935 16.8455L14.0057 19.1095Z" fill="currentColor"></path>
                </svg>
              </div>
              <div className={styles.chatField}>
                <input onChange={(e) => {
                  handleSendIcon();
                  setMsg(e.target.value)
                }}
                  type="text"
                  placeholder='Type a message'
                  value={msg}
                />
              </div>
            </div>
            <div className={styles.voice} onClick={sendMessage}>
              {sendIcon}
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

function Download() {
  return (
    <div className={styles.container}>
      <div className={styles.downloadContainer}>
        <div className={styles.downloadImg}>
          <img className={styles.downloadImage} src="https://static.whatsapp.net/rsrc.php/v4/y6/r/wa669aeJeom.png" />
        </div>
        <div className={`${styles.dwdMsg} ${styles.highlight}`}>
          Download Whatsapp for Windows
        </div>
        <div className={`${styles.dwdMsg} ${styles.showMsg}`}>
          Make calls, share your screen and get a faster experience when you download the Windows app.
        </div>
        <div className={styles.dwdMsg}>
          <button>Download</button>
        </div>

        <div className={styles.showEncryptedMsg}>
          <Lock />
          <div className={styles.encryptionMsg}>
            Your personal messages are end-to-end encrypted
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details;