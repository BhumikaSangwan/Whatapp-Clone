import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import Lens from '../Lens/index.jsx'
import Menu from '../Menu/index.jsx'
import Add from '../Add/index.jsx'
import Lock from '../Lock/index.jsx'
import Seen from '../Seen/index.jsx'
import TailIn from '../Tail/tailIn.jsx'
import TailOut from '../Tail/tailOut.jsx'



function Details({ selectedChat }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (selectedChat) {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 50);
    }
  }, [selectedChat]);

  return selectedChat ? <Clicked chatData={selectedChat} animate={animate} /> : <Download />;
}

function Clicked({ chatData }) {

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.showDP}>
          {chatData.dp}
        </div>
        <div className={styles.showBasics}>
          <div className={styles.name}>{chatData.name}</div>
          <div className={styles.basicInfo}>click here for contact info</div>
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
                <path d="M3.27096 7.31042C3 7.82381 3 8.49587 3 9.84V14.16C3 15.5041 3 16.1762 3.27096 16.6896C3.5093 17.1412 3.88961 17.5083 4.35738 17.7384C4.88916 18 5.58531 18 6.9776 18H13.1097C14.502 18 15.1982 18 15.7299 17.7384C16.1977 17.5083 16.578 17.1412 16.8164 16.6896C17.0873 16.1762 17.0873 15.5041 17.0873 14.16V9.84C17.0873 8.49587 17.0873 7.82381 16.8164 7.31042C16.578 6.85883 16.1977 6.49168 15.7299 6.26158C15.1982 6 14.502 6 13.1097 6H6.9776C5.58531 6 4.88916 6 4.35738 6.26158C3.88961 6.49168 3.5093 6.85883 3.27096 7.31042Z" fill="currentColor"></path>
                <path d="M18.7308 9.60844C18.5601 9.75994 18.4629 9.97355 18.4629 10.1974V13.8026C18.4629 14.0264 18.5601 14.2401 18.7308 14.3916L20.9567 16.3669C21.4879 16.8384 22.3462 16.4746 22.3462 15.778V8.22203C22.3462 7.52542 21.4879 7.16163 20.9567 7.63306L18.7308 9.60844Z" fill="currentColor"></path>
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
                  <path fill="currentColor" d="M11,21.212L17.35,15L11,8.65l1.932-1.932L21.215,15l-8.282,8.282L11,21.212z"></path>
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

      {/* Body  */}
      <div className={styles.body}>
        <div className={styles.description}>

          {chatData.messages && chatData.messages.map((message, i) => (
            message.sender !== "You" ? (
              <div key={i} className={styles.alignMsg} style={{ display: "flex", justifySelf: "flex-start" }}>
                <div className={`${styles.showMsg} ${styles.alignLeft}`}>
                  <TailIn />
                  <span className={styles.msg}>
                    <span className={styles.msgText}>{message.text}</span>
                    <span className={styles.msgTime}>{message.time}</span>
                  </span>
                </div>
              </div>
            ) : (
              <div key={i} className={`${styles.alignMsg} ${styles.alignRight}`}>
                <div className={styles.showMsg}>
                  <span className={styles.msg}>
                    <span className={styles.msgText}>{message.text}</span>
                    <span className={styles.msgTime}>{message.time}</span>
                    <Seen />
                  </span>
                  <TailOut />
                </div>
              </div>
            )
          ))}


          {/* <div className={styles.showMsg}>
            <TailIn />
            <span className={styles.msg}>
              <span className={styles.msgText}>Hello</span>
              <span className={styles.msgTime}>12:04</span>
            </span>
          </div> */}
          {/* <div className={`${styles.showMsg} ${styles.sentMsg}`}>
            <span className={styles.msg}>
              <span className={styles.msgText}>Hii</span>
              <span className={styles.msgTime}>12:24</span>
              <Seen />
            </span>
            <TailOut />
          </div> */}
          {/* <div className="message-out focusable-list-item _amjy _amjz _amjw" aria-label="You  1 bje  12:04 Read  "><span ></span>
            <div className="_amk4 _amkd _amk5"><span aria-hidden="true" data-icon="tail-out" className="_amk7">
              <svg
                viewBox="0 0 8 13"
                height="13"
                width="8"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                x="0px"
                y="0px"
                enableBackground="new 0 0 8 13"
              >
                <title>tail-out</title>
                <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path>
                <path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path>
              </svg></span>
              <div className="_amk6 _amlo">
                <span aria-label="You:"></span>
                <div><div className="x9f619 x1hx0egp x1yrsyyn x1ct7el4 x1dm7udd xwib8y2">
                  <div className="copyable-text" data-pre-plain-text="[12:04, 15/2/2025] Bhumika Sangwan: ">
                    <div className="_akbu">
                      <span dir="ltr" className="_ao3e selectable-text copyable-text" style="min-height: 0px;">
                        <span >1 bje</span></span>
                      <span><span className="x3nfvp2 xxymvpz xlshs6z xqtp20y xexx8yu x150jy0e x18d9i69 x1e558r4 x12lo8hy x152skdk" aria-hidden="true">
                        <span className="x1c4vz4f x2lah0s xn6xy2s"></span>
                        <span className="x1c4vz4f x2lah0s">12:04</span></span></span></div></div>
                  <div className="x1n2onr6 x1n327nk x18mqm2i xhsvlbd x11i5rnm xz62fqu xsgj6o6">
                    <div className="x13yyeie xx3o462 xuxw1ft x78zum5 x6s0dn4 x12lo8hy x152skdk" role="button">
                      <span className="x1rg5ohu x16dsc37" dir="auto">12:04</span>
                      <div className="x1pn4fmt x1rg5ohu x1w4ip6v">
                        <span aria-hidden="false" aria-label=" Read " data-icon="msg-dblcheck" className="x1q15gih">
                          <svg
                            viewBox="0 0 16 11"
                            height="11"
                            width="16"
                            preserveAspectRatio="xMidYMid meet"
                            fill="none">
                            <title>msg-dblcheck</title>
                            <path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg></span></div></div></div></div></div><span ></span><div className="_amlr"></div></div><div className="x1c4vz4f xs83m0k xdl72j9 x1g77sc7 x78zum5 xozqiw3 x1oa3qoh x12fk4p8 xeuugli x2lwn1j x13a6bvl x1q0g3np x6s0dn4 _amj_"><div className="x1c4vz4f xs83m0k xdl72j9 x1g77sc7 xeuugli x2lwn1j xozqiw3 x1oa3qoh x12fk4p8 xexx8yu x10ogl3i x18d9i69 x1k2j06m"><div></div></div></div></div><div className="x78zum5 x1n2onr6 xbfrwjf x8k05lb xeq5yr9 x4r51d9 xpvyfi4"></div>
          </div> */}
        </div>

        <div className={styles.foot}>
          <div className={styles.attach}>
            <Add />
            {/* <svg
              viewBox="0 0 24 24"
              width="30"
              preserveAspectRatio="xMidYMid meet"
              className="x11xpdln x1d8287x x1h4ghdb"
            >
              <title>Attach</title>
              <path fill="currentColor" d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
            </svg> */}
          </div>
          <div className={styles.chatBoard}>
            <div className={styles.keyboard}>
              <div className={styles.emoji}>
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
                <input
                  type="text"
                  placeholder='Type a message'
                />
              </div>
            </div>
            <div className={styles.voice}>
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
                <path fill="currentColor" d="M11.999,14.942c2.001,0,3.531-1.53,3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531 S8.469,2.35,8.469,4.35v7.061C8.469,13.412,9.999,14.942,11.999,14.942z M18.237,11.412c0,3.531-2.942,6.002-6.237,6.002 s-6.237-2.471-6.237-6.002H3.761c0,4.001,3.178,7.297,7.061,7.885v3.884h2.354v-3.884c3.884-0.588,7.061-3.884,7.061-7.885 L18.237,11.412z"></path>
              </svg>
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
          <img className={styles.downloadImage}  src="https://static.whatsapp.net/rsrc.php/v4/y6/r/wa669aeJeom.png" />
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

export default Details