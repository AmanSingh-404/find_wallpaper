import React from 'react'
import SearchBar from './components/SearchBar'
import Tabs from './components/Tabs'
import ResultGrid from './components/ResultGrid'


function App() {
    return (
        <div className='h-screen w-full bg-black'>
            <SearchBar />
            <Tabs />
            <ResultGrid />
        </div>
    )
}

export default App