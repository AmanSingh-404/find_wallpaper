import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../redux/features/searchSlice'

function SearchBar() {

  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setSearchQuery(text))
    setText('')
  }

  return (
    <div className='w-full flex justify-center'>
      <form onSubmit={submitHandler} className='flex items-center w-full max-w-3xl gap-0 shadow-2xl rounded-full overflow-hidden border border-white/20 transition-all hover:border-white/40 group focus-within:ring-4 focus-within:ring-blue-500/20'>
        <div className="relative flex-1 bg-white/10 backdrop-blur-md h-14">
          <div className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-300 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className='block w-full h-full pl-10 pr-3 border-none bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-0 sm:text-lg'
            type="text"
            placeholder='Search high-resolution photos, videos...'
          />
        </div>
        <button
          className='px-8 h-14 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 focus:outline-none'
          type='submit'
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar