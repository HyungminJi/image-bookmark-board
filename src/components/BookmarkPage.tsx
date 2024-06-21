import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleBookmark } from '../redux/bookmarksSlice';
import { Image } from '../redux/imagesSlice';
import '../styles/BookmarkPage.css';

const BookmarkPage: React.FC = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarks);

  const handleRemoveBookmark = (image: Image) => {
    dispatch(toggleBookmark(image));
  };

  return (
    <div className="bookmark-page">
      <h1>Bookmarked Images</h1>
      <div className="bookmark-list">
        {bookmarks.map((image) => (
          <div key={image.id} className="bookmark-item">
            <img src={image.urls.thumb} alt={image.alt_description} />
            <button onClick={() => handleRemoveBookmark(image)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkPage;