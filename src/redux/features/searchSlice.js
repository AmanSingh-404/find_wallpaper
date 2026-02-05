import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        query: '',
        activeTab: 'photos',
        page: 1,
        results: {
            photos: [],
            videos: [],
            collections: [],
        },
        isLoading: false,
        error: null
    },
    reducers: {
        setSearchQuery(state, action) {
            state.query = action.payload
            state.page = 1 // Reset page on new query
        },
        setActiveTab(state, action) {
            state.activeTab = action.payload
            state.page = 1 // Reset page on tab change
        },
        setPage(state, action) {
            state.page = action.payload
        },
        setSearchResults(state, action) {
            state.results = action.payload
            state.isLoading = false
        },
        appendSearchResults(state, action) {
            const { type, data } = action.payload; // type: 'photos', 'videos', etc.
            if (state.results[type]) {
                state.results[type] = [...state.results[type], ...data];
            }
            state.isLoading = false;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
            state.error = null
        },
        setError(state, action) {
            state.error = action.payload
            state.isLoading = false
        },
        clearResults(state) {
            state.results = {
                photos: [],
                videos: [],
                collections: [],
            }
            state.page = 1
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