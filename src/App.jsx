import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MediaModal from './components/MediaModal'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/photos" element={<HomePage />} />
                <Route path="/videos" element={<HomePage />} />
                <Route path="/collections" element={<HomePage />} />
            </Routes>
            <MediaModal />
        </Router>
    )
}

export default App