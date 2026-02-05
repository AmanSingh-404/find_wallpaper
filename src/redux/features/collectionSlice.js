import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        selectedCollectionId: null,
        collectionId: null,
        collectionPhotos: [],
        isLoading: false,
        error: null
    },
    reducers: {
        setSelectedCollection(state, action) {
            state.selectedCollectionId = action.payload;
            state.collectionPhotos = []; // Clear previous photos
        },
        setCollectionPhotos(state, action) {
            state.collectionPhotos = action.payload;
            state.isLoading = false;
        },
        appendCollectionPhotos(state, action) {
            state.collectionPhotos = [...state.collectionPhotos, ...action.payload];
            state.isLoading = false;
        },
        setCollectionLoading(state, action) {
            state.isLoading = action.payload;
            state.error = null;
        },
        setCollectionError(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearCollection(state) {
            state.selectedCollectionId = null;
            state.collectionPhotos = [];
        }
    }
});

export const {
    setSelectedCollection,
    setCollectionPhotos,
    appendCollectionPhotos,
    setCollectionLoading,
    setCollectionError,
    clearCollection
} = collectionSlice.actions;

export default collectionSlice.reducer;
