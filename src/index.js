import Notiflix from 'notiflix';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// import axios from 'axios';

import PicturesApiSeartch from './fetchPic';

// Налаштування повідомлень
Notiflix.Notify.init({
  width: '500px',
  position: 'left-top',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
});
// _______________________________

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
  sentinel: document.querySelector('#sentinel'),
};

const picturesApiSeartch = new PicturesApiSeartch();

refs.loadMore.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSubmit);

// Для кнопки завантажити ще.
// refs.loadMore.addEventListener('click', onLoadeMore);

let allPage = 0;

function onSubmit(evt) {
  evt.preventDefault();

  // const form = evt.currentTarget;

  // Для кнопки завантажити ще.
  // refs.loadMore.classList.add('is-hidden');

  // Значення з інпут форми

  picturesApiSeartch.queryPic =
    evt.currentTarget.elements.searchQuery.value.trim();

  // Перевірка на заповненість
  if (picturesApiSeartch.queryPic === '') {
    Notiflix.Notify.warning('Please, fill the main field');

    return;
  }

  clearPicture();

  // start fetch Ф-ція отримання зображень
  picturesApiSeartch
    .getPictures()
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      allPage += data.hits.length;

      if (data.totalHits <= allPage) {
        // Для кнопки завантажити ще.
        // refs.loadMore.classList.add('is-hidden');

        allPage = 0;
        murckupCard(data);

        Notiflix.Notify.info(
          ' Were sorry, but you ve reached the end of search results.'
        );

        return;
      }

      murckupCard(data);
      // form.reset();
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images !`);

      // Для кнопки завантажити ще.
      // refs.loadMore.classList.remove('is-hidden');
    })
    .catch(error => {
      console.error(error);
    });
}

//  реалізація безкінечного скролу

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && picturesApiSeartch.queryPic !== '') {
      // console.log('пора грузіть статью');

      picturesApiSeartch.getPictures().then(data => {
        // refs.gallery.insertadjacenthtml = '';

        // clearPicture();

        // перевірка на завершення завантежених сторінок
        if (!data.hits.length) {
          Notiflix.Notify.warning(
            ` Were sorry, but you ve reached the end of search results.`
          );
          return;
        }

        murckupCard(data);

        lightbox.refresh();
      });
    }
  });
};
const options = {
  rootMargin: '50px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);

// Ф-ція відмальовування перших картинок
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

  refs.gallery.insertAdjacentHTML('beforeend', murkup);
  lightbox.refresh();
}

//  Функція очистки завантежених сторінок
function clearPicture() {
  refs.gallery.innerHTML = '';
}

//  Lightbox бібліотека підключення
let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

// Ф-ція для кнопки завантажити більше

// function onLoadeMore() {
//   picturesApiSeartch.getPictures().then(data => {
//     let pageNow = data.hits.length;
//     allPage += pageNow;

//     murckupCard(data);

//     if (data.totalHits <= allPage) {
//       refs.loadMore.classList.add('is-hidden');
//       Notiflix.Notify.info(
//         ' Were sorry, but you ve reached the end of search results.'
//       );
//       allPage = 0;
//     }
//   });
// }
