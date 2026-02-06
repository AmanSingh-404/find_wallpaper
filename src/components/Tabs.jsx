import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'

function Tabs() {

  const tabs = [
    { label: 'Photos', value: 'photos' },
    { label: 'Videos', value: 'videos' },
    { label: 'Collections', value: 'collections' },
    { label: 'Favorites', value: 'favorites' },
  ]

  const dispatch = useDispatch()

  const activeTab = useSelector((state) => state.search.activeTab)

  return (
    <div className='flex justify-center gap-4 mb-8 flex-wrap'>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => dispatch(setActiveTab(tab.value))}
          className={`
                px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95
                ${activeTab === tab.value
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-md border border-white/5'}
            `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs