import React from 'react'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import ResultGrid from './components/ResultGrid'
import MediaModal from './components/MediaModal' // Import Modal

function App() {
    return (
        <div className='h-screen w-full bg-black'>
            <SearchBar />
            <Tabs />
            <ResultGrid />
            <MediaModal /> {/* Render Modal */}
        </div>
    )
}

export default App