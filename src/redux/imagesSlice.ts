import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchPhotos } from '../api/unsplash';

interface Image {
  id: string;
  urls: { thumb: string; regular: string };
  alt_description: string;
  user: { name: string };
  width: number;
  height: number;
  created_at: string;
  downloads: number;
  tags: { title: string }[];
}

interface ImagesState {
  images: Image[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ImagesState = {
  images: [],
  status: 'idle',
  error: null,
};

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await searchPhotos(query, page);
    return response.results;
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch images';
      });
  },
});

export default imagesSlice.reducer;
export type { Image };