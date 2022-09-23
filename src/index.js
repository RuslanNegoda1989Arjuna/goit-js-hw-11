import Notiflix from 'notiflix';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// import axios from 'axios';

import PicturesApiSeartch from './fetchPic';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  submit: document.querySelector('[type="submit"]'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const picturesApiSeartch = new PicturesApiSeartch();

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onLoadeMore);

function onSubmit(evt) {
  evt.preventDefault();

  // Значення з інпут форми

  picturesApiSeartch.queryPic =
    evt.currentTarget.elements.searchQuery.value.trim();
  picturesApiSeartch.clearPage();

  console.log(picturesApiSeartch.queryPic);

  // start fetch
  picturesApiSeartch.getPictures().then(data => {
    console.log(data);
    murckupCard(data);
  });
}

function onLoadeMore() {
  picturesApiSeartch.getPictures().then(data => {
    murckupCard(data);
  });
}

function murckupCard(data) {
  const murkup = data.hits
    .map(
      data => `<div class="photo-card">
  <a href="${data.largeImageURL}">
    <img class="photo-img" src="${data.webformatURL}" alt="${data.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${data.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${data.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${data.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${data.downloads}
    </p>
  </div>
  </div>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('afterbegin', murkup);
}

// e.g. Only message
Notiflix.Notify.success('Sol lucet omnibus');

Notiflix.Notify.failure('Qui timide rogat docet negare');

Notiflix.Notify.warning('Memento te hominem esse');

Notiflix.Notify.info('Cogito ergo sum');

// e.g. Message with a callback
