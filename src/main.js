// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.gallery-load');
const loadMoreBtn = document.querySelector('.js-btn-load-more');

let page = 1;
let searchInputQuery = '';

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    searchInputQuery = event.currentTarget.elements.user_gallery.value.trim();

    if (searchInputQuery === '') {
      iziToast.show({
        message: `❌ Sorry,Please, try again!`,
        color: 'red',
        position: 'topRight',
      });
      return;
    }
    galleryEl.innerHTML = '';
    searchFormEl.reset();

    const showLoader = () => {
      loader.classList.remove('hidden');
    };
    showLoader();

    page = 1;
    loadMoreBtn.classList.add('is-hidden');
    const response = await fetchPhotosByQuery(searchInputQuery, page);

    const stopLoader = () => {
      loader.classList.add('hidden');
    };
    stopLoader();

    const galleryTemplate = response.data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');

    galleryEl.innerHTML = galleryTemplate;

    if (response.data.hits.length === 0) {
      iziToast.show({
        message: `❌ Sorry, there are no images matching your search query. Please, try again!`,
        color: 'red',
        position: 'topRight',
      });
    }

    const totalLoadedImages = page * 15;

    if (response.data.totalHits > totalLoadedImages) {
      loadMoreBtn.classList.remove('is-hidden');
      loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    }
  } catch (error) {
    console.log(error);
  }
};
searchFormEl.addEventListener('submit', onSearchFormSubmit);

const onLoadMoreBtnClick = async event => {
  try {
    page++;

    const response = await fetchPhotosByQuery(searchInputQuery, page);
    const galleryTemplate = response.data.hits
      .map(el => createGalleryCardTemplate(el))
      .join('');

    console.log('ggggg');

    galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);
    lightbox.refresh();

    const { height: cardHeight } =
      galleryEl.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalLoadedImages = page * 15; // 15 — це кількість зображень на сторінку
    if (totalLoadedImages >= response.data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);

      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        color: 'blue',
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Ініціалізація SimpleLightbox
let lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});
