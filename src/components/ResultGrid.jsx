import React, { useEffect } from 'react'
import { fetchPhotos, fetchVideos, fetchCollections, fetchCollectionMedia } from '../Api/MediaApi'
import { setSearchQuery, setActiveTab, setSearchResults, appendSearchResults, setIsLoading, setError, setPage } from '../redux/features/searchSlice'
import { setSelectedCollection, setCollectionPhotos, setCollectionLoading, setCollectionError, clearCollection } from '../redux/features/collectionSlice'
import { useSelector, useDispatch } from 'react-redux'

function ResultGrid() {
    const dispatch = useDispatch()
    const { query, activeTab, results, isLoading, error, page } = useSelector((state) => state.search)
    // Collection state
    const { selectedCollectionId, collectionPhotos, isLoading: isCollectionLoading } = useSelector((state) => state.collection)

    // Helper to fetch main search results
    const fetchResults = async (pageNum = 1, isAppend = false) => {
        dispatch(setIsLoading(true))
        try {
            let data = []
            if (activeTab === 'photos') {
                let response = await fetchPhotos(query, pageNum)
                data = response.results.map((item) => ({
                    id: item.id,
                    type: "photos",
                    title: item.alt_description,
                    thumbnail: item.urls.small,
                    src: item.urls.full
                }))
            } else if (activeTab === 'videos' || activeTab === 'video') {
                let response = await fetchVideos(query, pageNum)
                data = response.videos.map((item) => ({
                    id: item.id,
                    type: "videos",
                    title: item.user.name,
                    thumbnail: item.image,
                    src: item.video_files[0].link
                }))
            } else if (activeTab === 'collections') {
                let response = await fetchCollections(query, pageNum)
                data = response.results.map((item) => ({
                    id: item.id,
                    type: "collections",
                    title: item.title,
                    thumbnail: item.cover_photo.urls.small,
                    src: item.links.html, // Fallback
                    total_photos: item.total_photos
                }))
            }

            if (isAppend) {
                dispatch(appendSearchResults({ type: activeTab === 'video' ? 'videos' : activeTab, data }))
            } else {
                dispatch(setSearchResults({
                    ...results,
                    [activeTab === 'video' ? 'videos' : activeTab]: data
                }))
            }
        } catch (err) {
            console.error("Failed to fetch data:", err)
            dispatch(setError(err.message || 'Failed to fetch data'))
        }
    }

    // Effect for initial load or query/tab change (page 1)
    useEffect(() => {
        if (query) {
            fetchResults(1, false)
        }
    }, [query, activeTab, dispatch]) // removed results dependence to avoid loops

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

    if (isLoading && page === 1 && !collectionPhotos.length) return <div className="text-white text-center p-10">Loading...</div>
    if (error) return <div className="text-red-500 text-center p-10">Error: {error}</div>

    // Render Collection Details View
    if (selectedCollectionId) {
        return (
            <div className='p-4'>
                <button onClick={handleBackToCollections} className='mb-4 text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600'>&larr; Back to Collections</button>
                {isCollectionLoading ? <div className="text-white text-center">Loading collection photos...</div> : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {collectionPhotos.map((item) => (
                            <div key={item.id} className='relative group overflow-hidden rounded-lg'>
                                <img src={item.thumbnail} alt={item.title} className='w-full h-auto object-cover hover:scale-105 transition duration-300' />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    const currentData = results[activeTab === 'video' ? 'videos' : activeTab] || []

    return (
        <div className='pb-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {currentData.map((item) => (
                    <div key={item.id} className='relative group overflow-hidden rounded-lg' onClick={() => item.type === 'collections' && handleCollectionClick(item.id)}>
                        {item.type === 'videos' ? (
                            <div className='relative'>
                                <img src={item.thumbnail} alt={item.title} className='w-full h-auto object-cover' />
                                <div className='absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition'>
                                    <span className='text-white text-sm bg-black/50 px-2 py-1 rounded'>Video</span>
                                </div>
                            </div>
                        ) : (
                            <div className={item.type === 'collections' ? 'cursor-pointer' : ''}>
                                <img src={item.thumbnail} alt={item.title} className='w-full h-auto object-cover hover:scale-105 transition duration-300' />
                                {item.type === 'collections' && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition'>
                                        <span className='text-white font-bold border border-white px-3 py-1 rounded'>View Collection</span>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className='absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-sm truncate opacity-0 group-hover:opacity-100 transition'>
                            {item.title || 'Untitled'}
                        </div>
                    </div>
                ))}
            </div>

            {currentData.length > 0 && (
                <div className='flex justify-center mt-4'>
                    <button onClick={handleLoadMore} disabled={isLoading} className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'>
                        {isLoading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default ResultGrid