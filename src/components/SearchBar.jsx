import React, { useState } from 'react'

function SearchBar() {

    const [text, setText] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(text)
    }

  return (
    <div>
        <form onSubmit={submitHandler} className='flex p-10'>
            <input required className='flex-1 p-2 border border-gray-300 rounded' type="text" placeholder='Search'/>
            <button className='p-2 border border-gray-300 rounded cursor-pointer active:scale-95' type='submit'>Search</button>
        </form>
    </div>
  )
}

export default SearchBar