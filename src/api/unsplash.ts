// src/api/unsplash.ts
import axios from 'axios';

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

if (!ACCESS_KEY) {
  throw new Error('Unsplash Access Key is missing. Please add it to your .env file.');
}

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const searchPhotos = async (query: string, page: number) => {
  const response = await api.get('/search/photos', {
    params: {
      query,
      page,
      per_page: 20,
    },
  });
  return response.data;
};

export const getPhotos = async (id: string) => {
	const response = await api.get('/photos/' + id, {});
	return response.data;
};