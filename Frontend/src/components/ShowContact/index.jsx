import styles from "./styles.module.css";

function index({chatData}) {
  let l = chatData.messages.length - 1;

  let lastMessage = chatData.messages[l].text;

  let displayMessage = lastMessage.length > 50 ? lastMessage.slice(0, 50) + ". . ." : lastMessage;
  let unread = chatData.unread;
  return (
    <div className={styles.container}>
        <div className={styles.contact}>
          <div className={styles.dp}>
            {chatData.dp}
          </div>
          <div className={styles.info}>
            <div className={styles.nameDetails}>
              <div className={styles.name}>{chatData.name}</div>
              <div className={styles.time}>{chatData.messages[l].time}</div>
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