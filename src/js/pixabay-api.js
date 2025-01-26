import axios from 'axios';

export const fetchPhotosByQuery = (searchInputQuery, currentPage) => {
  const axiosOptions = {
    params: {
      key: '48308646-4d458c48d5d2f9bc699dc7008',
      q: searchInputQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 15,
    },
  };

  return axios.get('https://pixabay.com/api/', axiosOptions);
};
