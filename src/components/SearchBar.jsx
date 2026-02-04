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
    <div>
        <form onSubmit={submitHandler} className='flex p-10'>
            <input value={text} onChange={(e) => setText(e.target.value)} required className='flex-1 p-2 border border-gray-300 rounded' type="text" placeholder='Search'/>
            <button className='p-2 border border-gray-300 rounded cursor-pointer active:scale-95' type='submit'>Search</button>
        </form>
    </div>
  )
}

export default SearchBar