import Notiflix from 'notiflix';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

import PicturesAPI from './fetchCountries';

// e.g. Only message
Notiflix.Notify.success('Sol lucet omnibus');

Notiflix.Notify.failure('Qui timide rogat docet negare');

Notiflix.Notify.warning('Memento te hominem esse');

Notiflix.Notify.info('Cogito ergo sum');

// e.g. Message with a callback

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  submit: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const PicturesAPI = new PicturesAPI();

refs.searchForm.addEventListener('submit', onSubmit);

let textSearch = '';

function onSubmit(evt) {
  evt.preventDefault();

  // Значення з інпут форми

  // PicturesAPI.queryPic = evt.currentTarget.elements.searchQuery.value;
  // console.log(PicturesAPI.queryPic);

  textSearch = evt.currentTarget.elements.searchQuery.value;
  // start fetch
  getPictures();
}

async function getPictures() {
  const API_KEY = '30077123-b07f3bce85b956a1421c5c012';
  const API = 'https://pixabay.com/api';
  const parametersS = 'image_type=photo&orientation=horizontal&safesearch=true';
  const url = `${API}/?key=${API_KEY}&q=${textSearch}&${parametersS}&per_page=40&page=1`;
  try {
    const response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
