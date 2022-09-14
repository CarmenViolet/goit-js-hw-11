import axios from "axios";
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { createGalleryMarkup } from "./js/markup";
import { searchQuery } from "./js/fetch";

const formEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery')
const buttonEl = document.querySelector('.js-load-more');

const lightbox = new SimpleLightbox('.gallery a', { });

formEl.addEventListener('submit', searchInformation);
buttonEl.addEventListener('click', onButtonClick);

async function searchInformation(event) {
    event.preventDefault();
    buttonEl.hidden = false;
    searchQuery.page = 1;

    const query = event.target.elements.searchQuery.value.trim();
    
    const response = await searchQuery.searchPictures(query);
    const galleryItem = response.hits;

    try {
        galleryEl.innerHTML = '';
        if(galleryItem.length === 0) {
            Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
            buttonEl.hidden = true;
          }  else if (!query) {
                Notiflix.Notify.info('Please, enter key word for search!');
                buttonEl.hidden = true;
                return;
        } else {
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            renderingMarkup(response.hits);
        } 
   
    } catch (error) {
        console.log(error.message);
    }

}

async function onButtonClick() {
    searchQuery.page += 1;

    if(searchQuery.page === 13) {
        buttonEl.hidden = true;
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }

    const response = await searchQuery.searchPictures();
    renderingMarkup(response.hits);
  
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

    window.scrollBy({
     top: cardHeight * 2,
     behavior: "smooth",
    });
};
 
function renderingMarkup(array) {
    galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup(array));
    lightbox.refresh();
}