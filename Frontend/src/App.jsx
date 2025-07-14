import { useState , useEffect} from 'react'
import Sidebar from './components/Sidebar/index.jsx'
import Option from './components/Option/index.jsx'
import Details from './components/Details/index.jsx'
import './App.css'

function App() {
  
  const [selectedChat, setSelectedChat] = useState(null);
  const [me, setMe] = useState(null);
  const [option, setOption] = useState("Chats");

  const handleChatClick = (chatData, me) => {
    setSelectedChat(chatData)
    setMe(me);
  }

  const handleOption = (selection) => {
    setOption(selection);
  } 
  return (
    <>
      <div className="container">
        <div className='bgTop'></div>
        <Sidebar className="nav" onSelection={handleOption}/>
        <Option className="option" onChatClick={handleChatClick} option={option}/>
        <Details className="details" selectedChat={selectedChat} me={me}/>
      </div>
    </>
  )
}

export default App


