import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'
function Tabs() {

    const tabs = [
        {label:'Photos',value:'photos'},
        {label:'Videos',value:'videos'},
        {label:'Collections',value:'collections'},
    ]

    const dispatch = useDispatch()

    const activeTab = useSelector((state) => state.search.activeTab)

  return (
    <div>
        {tabs.map(tab=>(
            <button className= {`${activeTab === tab.value ? 'bg-blue-500' : ''} text-white bg-gray-800 p-2 rounded cursor-pointer active:scale-95 `} key={tab.value} onClick={()=>dispatch(setActiveTab(tab.value))}>{tab.label}</button>
        ))}
    </div>
  )
}

export default Tabs