import React, { useEffect, useCallback } from 'react'
import { fetchPhotos, fetchVideos, fetchCollections, fetchCollectionMedia, fetchCuratedPhotos, fetchPopularVideos } from '../Api/MediaApi'
import { setSearchResults, appendSearchResults, setIsLoading, setError, setPage } from '../redux/features/searchSlice'
import { setSelectedCollection, setCollectionPhotos, setCollectionLoading, setCollectionError, clearCollection, addToFavorites, removeFromFavorites, setSelectedMedia } from '../redux/features/collectionSlice'
import { useSelector, useDispatch } from 'react-redux'

function ResultGrid() {
    const dispatch = useDispatch()
    const { query, activeTab, results, isLoading, error, page } = useSelector((state) => state.search)
    // Collection state & Favorites
    const { selectedCollectionId, collectionPhotos, isLoading: isCollectionLoading, favorites } = useSelector((state) => state.collection)

    // Helper to fetch main search results
    const fetchResults = useCallback(async (pageNum = 1, isAppend = false) => {
        dispatch(setIsLoading(true))
        try {
            let data = []
            if (activeTab === 'photos') {
                let response;
                if (query) {
                    response = await fetchPhotos(query, pageNum)
                } else {
                    response = await fetchCuratedPhotos(pageNum)
                }
                data = response.results.map((item) => ({
                    id: item.id,
                    type: "photos",
                    title: item.alt_description,
                    thumbnail: item.urls.small,
                    src: item.urls.full
                }))
            } else if (activeTab === 'videos' || activeTab === 'video') {
                let response;
                if (query) {
                    response = await fetchVideos(query, pageNum)
                } else {
                    response = await fetchPopularVideos(pageNum)
                }
                data = response.videos.map((item) => ({
                    id: item.id,
                    type: "videos",
                    title: item.user.name,
                    thumbnail: item.image,
                    src: item.video_files[0].link
                }))
            } else if (activeTab === 'collections') {
                let response = await fetchCollections(query || 'curated', pageNum)
                data = response.results.map((item) => ({
                    id: item.id,
                    type: "collections",
                    title: item.title,
                    thumbnail: item.cover_photo.urls.small,
                    src: item.links.html, // Fallback
                    total_photos: item.total_photos
                }))
            } else if (activeTab === 'favorites') {
                dispatch(setIsLoading(false))
                return;
            }

            if (isAppend) {
                dispatch(appendSearchResults({ type: activeTab === 'video' ? 'videos' : activeTab, data }))
            } else {
                dispatch(setSearchResults({
                    type: activeTab === 'video' ? 'videos' : activeTab,
                    data
                }))
            }
        } catch (err) {
            console.error("Failed to fetch data:", err)
            dispatch(setError(err.message || 'Failed to fetch data'))
        }
    }, [activeTab, query, dispatch])

    // Effect for initial load or query/tab change (page 1)
    useEffect(() => {
        if (activeTab === 'favorites') {
            dispatch(setIsLoading(false));
            return;
        }

        // Fetch on mount or change.
        // If query is empty, fetchResults handles it by fetching curated/popular.
        // We always fetch unless it's favorites.
        fetchResults(1, false)

    }, [query, activeTab, dispatch, fetchResults])

    // Effect for fetching collection details when selected
    useEffect(() => {
        const getCollectionPhotos = async () => {
            if (!selectedCollectionId) return;
            dispatch(setCollectionLoading(true));
            try {
                const response = await fetchCollectionMedia(selectedCollectionId);
                const data = response.map((item) => ({
                    id: item.id,
                    type: "photos",
                    title: item.alt_description,
                    thumbnail: item.urls.small,
                    src: item.urls.full
                }))
                dispatch(setCollectionPhotos(data));
            } catch (err) {
                dispatch(setCollectionError(err.message));
            }
        };
        getCollectionPhotos();
    }, [selectedCollectionId, dispatch]);


    const handleLoadMore = () => {
        const nextPage = page + 1;
        dispatch(setPage(nextPage));
        fetchResults(nextPage, true);
    }

    const handleCollectionClick = (id) => {
        dispatch(setSelectedCollection(id));
    }

    const handleBackToCollections = () => {
        dispatch(clearCollection());
    }

    const handleItemClick = (item) => {
        if (item.type === 'collections') {
            handleCollectionClick(item.id);
        } else {
            dispatch(setSelectedMedia(item));
        }
    }

    const handleFavoriteClick = (e, item) => {
        e.stopPropagation(); // Prevent modal opening
        const isFav = favorites.some(fav => fav.id === item.id);
        if (isFav) {
            dispatch(removeFromFavorites(item));
        } else {
            dispatch(addToFavorites(item));
        }
    }

    const isFavorite = (id) => favorites.some(fav => fav.id === id);


    if (isLoading && page === 1 && !collectionPhotos.length && activeTab !== 'favorites') return <div className="text-white text-center p-10">Loading...</div>
    if (error && activeTab !== 'favorites') return <div className="text-red-500 text-center p-10">Error: {error}</div>

    // Render Collection Details View
    if (selectedCollectionId) {
        return (
            <div className='p-4'>
                <button onClick={handleBackToCollections} className='mb-4 text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600'>&larr; Back to Collections</button>
                {isCollectionLoading ? <div className="text-white text-center">Loading collection photos...</div> : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {collectionPhotos.map((item) => (
                            <div key={item.id} className='relative group overflow-hidden rounded-lg cursor-pointer' onClick={() => handleItemClick(item)}>
                                <img src={item.thumbnail} alt={item.title} className='w-full h-auto object-cover hover:scale-105 transition duration-300' />
                                {/* Favorite Button Overlay */}
                                <button
                                    onClick={(e) => handleFavoriteClick(e, item)}
                                    className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white z-10 opacity-0 group-hover:opacity-100 transition"
                                >
                                    {isFavorite(item.id) ? '♥' : '♡'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    // Determine data source
    const currentData = activeTab === 'favorites' ? favorites : (results[activeTab === 'video' ? 'videos' : activeTab] || [])

    return (
        <div className='pb-10 w-full px-4'>
            {activeTab === 'favorites' && currentData.length === 0 && (
                <div className="text-gray-400 text-center p-10 text-lg">No favorites saved yet. Start exploring!</div>
            )}

            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'>
                {currentData.map((item) => (
                    <div key={item.id} className='relative group break-inside-avoid rounded-xl overflow-hidden cursor-zoom-in shadow-lg hover:shadow-2xl transition-all duration-500' onClick={() => handleItemClick(item)}>
                        {item.type === 'videos' ? (
                            <div className='relative'>
                                <img src={item.thumbnail} alt={item.title} className='w-full h-auto object-cover transform group-hover:scale-110 transition duration-700 ease-in-out' />
                                <div className='absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition duration-300'>
                                    <span className='text-white text-xs font-bold uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10'>Video</span>
                                </div>
                            </div>
                        ) : (
                            <div className={item.type === 'collections' ? '' : ''}>
                                <img src={item.thumbnail} alt={item.title} className='w-full h-auto object-cover transform group-hover:scale-110 transition duration-700 ease-in-out' />
                                {item.type === 'collections' && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-[2px]'>
                                        <span className='text-white font-bold border border-white/30 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md'>View Collection</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Favorite Button (Not for collection items) */}
                        {item.type !== 'collections' && (
                            <button
                                onClick={(e) => handleFavoriteClick(e, item)}
                                className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-all duration-300 transform hover:scale-110 ${isFavorite(item.id) ? 'bg-red-500 text-white opacity-100 shadow-red-500/50 shadow-lg' : 'bg-black/40 text-white opacity-0 group-hover:opacity-100 backdrop-blur-md hover:bg-black/60'}`}
                            >
                                {isFavorite(item.id) ? '♥' : '♡'}
                            </button>
                        )}

                        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
                            <h3 className='text-white text-sm font-medium truncate drop-shadow-md'>{item.title || 'Untitled'}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {activeTab !== 'favorites' && currentData.length > 0 && !selectedCollectionId && (
                <div className='flex justify-center mt-12 mb-8'>
                    <button onClick={handleLoadMore} disabled={isLoading} className='px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95'>
                        {isLoading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default ResultGrid