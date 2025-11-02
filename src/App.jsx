import { NavLink, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Redirector from './components/Redirector.jsx'

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <NavLink className="nav-link" to="/">Home</NavLink>
        <NavLink className="nav-link" to="/about">About us</NavLink>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/:code" element={<Redirector />} />
        </Routes>
      </main>
    </div>
  )
}

