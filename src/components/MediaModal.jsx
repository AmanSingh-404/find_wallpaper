import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedMedia, addToFavorites, removeFromFavorites } from '../redux/features/collectionSlice';

const MediaModal = () => {
    const dispatch = useDispatch();
    const { selectedMedia, favorites } = useSelector((state) => state.collection);

    if (!selectedMedia) return null;

    const isFavorite = favorites.some((item) => item.id === selectedMedia.id);

    const handleClose = () => {
        dispatch(clearSelectedMedia());
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(selectedMedia));
        } else {
            dispatch(addToFavorites(selectedMedia));
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleBackdropClick}
        >
            <div className="relative max-w-5xl w-full max-h-[90vh] bg-transparent flex flex-col items-center">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white text-3xl font-bold bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 z-50 transition"
                >
                    &times;
                </button>

                {/* Media Content */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg shadow-2xl bg-black">
                    {selectedMedia.type === 'videos' ? (
                        <video
                            src={selectedMedia.src}
                            controls
                            autoPlay
                            className="max-w-full max-h-[85vh] object-contain"
                        />
                    ) : (
                        <img
                            src={selectedMedia.src}
                            alt={selectedMedia.title}
                            className="max-w-full max-h-[85vh] object-contain"
                        />
                    )}
                </div>

                {/* Controls / Info */}
                <div className="flex items-center justify-between w-full mt-4 bg-white/10 p-4 rounded-lg backdrop-blur-md">
                    <h2 className='text-white text-lg font-semibold truncate max-w-[70%]'>
                        {selectedMedia.title || 'Untitled'}
                    </h2>

                    <div className='flex gap-4'>
                        {/* Download Button (Optional - implementation depends on CORS/proxy) */}
                        <a
                            href={selectedMedia.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                            download
                        >
                            Download/Open
                        </a>

                        {/* Save Button */}
                        <button
                            onClick={toggleFavorite}
                            className={`px-4 py-2 rounded font-bold transition flex items-center gap-2 ${isFavorite ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-black hover:bg-gray-200'}`}
                        >
                            {isFavorite ? '♥ Unsave' : '♡ Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaModal;
