import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhotos } from '../api/unsplash';

interface ImageById {
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

interface ImageByIdState {
	image: null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
  }
  
const initialState: ImageByIdState = {
	image: null,
	status: 'idle',
	error: null,
};

export const fetchImageById = createAsyncThunk(
  'fetchImageById',
  async (id: string) => {
    const response = await getPhotos(id);
    return response;
  }
);

export const imageSlice = createSlice({
	name: 'image',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
	  // 비동기 thunk의 시작 상태 처리
	  builder.addCase(fetchImageById.pending, (state) => {
		state.status = 'loading';
	  });
	  // 비동기 thunk의 성공 상태 처리
	  builder.addCase(fetchImageById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.image = action.payload;
      });
	  // 비동기 thunk의 실패 상태 처리
	  builder.addCase(fetchImageById.rejected, (state, action) => {
		state.status = 'failed';
		state.error = action.error.message ? action.error.message : null;
	  });
	},
  });

export default imageSlice.reducer;
export type { ImageById };