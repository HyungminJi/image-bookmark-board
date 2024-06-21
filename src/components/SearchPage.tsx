import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchImages } from '../redux/imagesSlice';
import ImageList from './ImageList';
import ImageDetailModal from './ImageDetailModal';
import { Image } from '../redux/imagesSlice';
import '../styles/SearchPage.css';

const SearchPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { images, status } = useSelector((state: RootState) => state.images);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchImages({ query, page: currentPage }));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchImages({ query, page }));
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="search-page">
      <header className="header">
        <h1>Unsplash Clone</h1>
        <div className="search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Failed to load images</p>}
      {status === 'succeeded' && (
        <ImageList images={images} onImageClick={handleImageClick} />
      )}
      <div className="pagination">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {selectedImage && (
        <ImageDetailModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};

export default SearchPage;