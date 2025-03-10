import styles from "./styles.module.css";

import Status from '../Status/index.jsx'
import Channels from '../Channels/index.jsx'
import Communities from '../Communities/index.jsx'
import Meta from '../Meta/index.jsx'
import Settings from '../Settings/index.jsx'
import Profile from '../Profile/index.jsx'
import Chats from '../Chats/index.jsx'



export default function Option({ onChatClick, option }) { 
  return (
    <div className={styles.container}>
      
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
