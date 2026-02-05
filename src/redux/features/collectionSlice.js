import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        selectedCollectionId: null,
        collectionId: null,
        collectionPhotos: [],
        favorites: JSON.parse(localStorage.getItem('wallpaper_favorites')) || [],
        selectedMedia: null, // For full view modal
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
        },
        // Favorites
        addToFavorites(state, action) {
            const exists = state.favorites.find(item => item.id === action.payload.id);
            if (!exists) {
                state.favorites.push(action.payload);
                localStorage.setItem('wallpaper_favorites', JSON.stringify(state.favorites));
            }
        },
        removeFromFavorites(state, action) {
            state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
            localStorage.setItem('wallpaper_favorites', JSON.stringify(state.favorites));
        },
        // Modal
        setSelectedMedia(state, action) {
            state.selectedMedia = action.payload;
        },
        clearSelectedMedia(state) {
            state.selectedMedia = null;
        }
    }
});

export const {
    setSelectedCollection,
    setCollectionPhotos,
    appendCollectionPhotos,
    setCollectionLoading,
    setCollectionError,
    clearCollection,
    addToFavorites,
    removeFromFavorites,
    setSelectedMedia,
    clearSelectedMedia
} = collectionSlice.actions;

export default collectionSlice.reducer;
