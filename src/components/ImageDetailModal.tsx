import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { toggleBookmark } from '../redux/bookmarksSlice';
import { Image } from '../redux/imagesSlice';
import '../styles/ImageDetailModal.css';

interface ImageDetailModalProps {
  image: Image | null;
  onClose: () => void;
}

const ImageDetailModal: React.FC<ImageDetailModalProps> = ({ image, onClose }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks);

  if (!image) return null;

  const handleBookmarkClick = () => {
    dispatch(toggleBookmark(image));
  };

  const isBookmarked = bookmarks.some(bookmark => bookmark.id === image.id);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header>
          <h2>{image.user.name}</h2>
          <span className="bookmark-icon" onClick={handleBookmarkClick}>
            {isBookmarked ? '❤️' : '🤍'}
          </span>
        </header>
        <div className="modal-body">
          <img src={image.urls.regular} alt={image.alt_description} />
          <p>Size: {image.width} x {image.height}</p>
          <p>Uploaded: {new Date(image.created_at).toLocaleDateString()}</p>
          <p>Downloads: {image.downloads}</p>
          <p>Tags: {image.tags.map(tag => tag.title).join(', ')}</p>
        </div>
        <button onClick={onClose} className="close-button">X</button>
      </div>
    </div>
  );
};

export default ImageDetailModal;