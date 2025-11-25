import { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import './css/App.css'
import Home from './pages/Home'
import Zoom from './pages/Zoom'

function App() {
  const wrapperRef = useRef(null);

  // function passed to children to update bg
  const setBackground = (imgURL) => {
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty("--bg-url", `url('${imgURL}')`);
    }
  }

  return (
    <UserProvider>
      <div className="root-wrapper" ref={wrapperRef}>        
        <Routes>
          <Route path="/" element={<Home setBackground={setBackground} />} />
          <Route path="/start" element={<Zoom />} />
          <Route path="/user" element={<Zoom />} />
          <Route path="/start/about" element={<Zoom />} />
          <Route path="/start/generate" element={<Zoom />} />
          <Route path="/user/account" element={<Zoom />} />
          <Route path="/user/activities" element={<Zoom />} />
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App