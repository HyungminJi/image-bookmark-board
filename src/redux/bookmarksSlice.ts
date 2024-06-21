import { createSlice } from '@reduxjs/toolkit';
import { Image } from './imagesSlice';

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: [] as Image[],
  reducers: {
    toggleBookmark: (state, action) => {
      const image = action.payload;
      const index = state.findIndex((img) => img.id === image.id);
      if (index === -1) {
        state.push(image);
      } else {
        state.splice(index, 1);
      }
    },
  },
});

export const { toggleBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
