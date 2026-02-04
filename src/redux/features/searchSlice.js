import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:"search",
    initialState:{
        query:'',
        activeTab:'photos',
        results:{
            photos:[],
            videos:[],
            collections:[],
        },
        isLoading:false,
        error:null
    },
    reducers:{
        setSearchQuery(state,action){
            state.query = action.payload
        },
        setActiveTab(state,action){
            state.activeTab = action.payload
        },
        setSearchResults(state,action){
            state.results = action.payload
            state.isLoading = false
        },
        setIsLoading(state,action){
            state.isLoading = action.payload
            state.error = null
        },
        setError(state,action){
            state.error = action.payload
            state.isLoading = false
        },
        clearResults(state){
            state.results = {
                photos:[],
                videos:[],
                collections:[],
            }
        }
    }
})

export const {
    setSearchQuery,
    setActiveTab,
    setSearchResults,
    setIsLoading,
    setError,
    clearResults
} = searchSlice.actions
export default searchSlice.reducer