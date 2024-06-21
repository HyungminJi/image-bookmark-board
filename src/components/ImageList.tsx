import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleBookmark } from '../redux/bookmarksSlice';
import { Image } from '../redux/imagesSlice';
import '../styles/ImageList.css';

interface ImageListProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageList: React.FC<ImageListProps> = ({ images, onImageClick }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks);

  const handleBookmarkClick = (image: Image) => {
    dispatch(toggleBookmark(image));
  };

  return (
    <div className="image-list">
      {images.map((image) => (
        <div key={image.id} className="image-item">
          <img src={image.urls.thumb} alt={image.alt_description} onClick={() => onImageClick(image)} />
          <span className="bookmark-icon" onClick={() => handleBookmarkClick(image)}>
            {bookmarks.some(bookmark => bookmark.id === image.id) ? '❤️' : '🤍'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ImageList;