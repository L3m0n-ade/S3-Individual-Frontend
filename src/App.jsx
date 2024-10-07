import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import GamePage from './pages/GamePage';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h4>:3</h4> */}
      <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/1" element={<GamePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
