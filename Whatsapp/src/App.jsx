import Sidebar from './components/Sidebar/index.jsx'
import Option from './components/Option/index.jsx'
import Details from './components/Details/index.jsx'
import './App.css'

function App() {

  return (
    <>
      <div className="container">
        <div className='bgTop'></div>
        <Sidebar className="nav"/>
        <Option className="option"/>
        <Details className="details"/>
      </div>
    </>
  )
}

export default App
