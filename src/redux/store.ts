import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from './imagesSlice';
import bookmarksReducer from './bookmarksSlice';

const store = configureStore({
  reducer: {
    images: imagesReducer,
    bookmarks: bookmarksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;