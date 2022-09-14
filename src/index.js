import axios from "axios";
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { createGalleryMarkup } from "./js/markup";
import { searchQuery } from "./js/fetch";

const formEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery')
const buttonEl = document.querySelector('.js-load-more');

var lightbox = new SimpleLightbox('.gallery a', { });

formEl.addEventListener('submit', searchInformation);
buttonEl.addEventListener('click', onButtonClick);

async function searchInformation(event) {
    event.preventDefault();
    buttonEl.hidden = false;
    galleryEl.innerHTML = '';
    searchQuery.page = 1;

    const query = event.target.elements.searchQuery.value.trim();

    if (!query) {
      Notiflix.Notify.info('Please, enter key word for search!');
      return;
    }

    const response = await searchQuery.searchPictures(query);
    renderingMarkup(response);
   
}

async function onButtonClick() {
    searchQuery.page += 1;

    if(searchQuery.page === searchQuery.totalHits) {
        buttonEl.hidden = true;
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }

    const response = await searchQuery.searchPictures();
    renderingMarkup(response);
  
};
 
function renderingMarkup(array) {
    galleryEl.insertAdjacentHTML('afterbegin', createGalleryMarkup(array));
    lightbox.refresh();
}