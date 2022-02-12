import './css/styles.css'
import Notiflix from 'notiflix';
import NewsApiService from './js/fetchPictures'
import templatesImg from './templates/pictures.hbs'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    submitForm: document.querySelector('.load'),
    loadMoreBtn: document.querySelector('.load-more'),
    input: document.querySelector('input')
}

const newsApiService = new NewsApiService()

refs.loadMoreBtn.addEventListener('click', onLoadMore)

refs.form.addEventListener('submit', (e) => {
    e.preventDefault()
    clearPictures()
    newsApiService.query = e.currentTarget.elements.searchQuery.value
    if (newsApiService.query.trim() === '' ) {
        return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.") 
    }
  
    newsApiService.resetPage()
    newsApiService.fetchPictures()
        .then(data => {
       if (data.hits.length === 0) {
           return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")   
       }
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`)
            clearPictures()
            renderPictures(data)
            refs.input.value = ''
        }) 
   
})
 
function renderPictures(data) {
    refs.loadMoreBtn.classList.add('is-hidden')
    if (data.hits.length < 29) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")  
        refs.loadMoreBtn.classList.remove('is-hidden')
    }
    refs.gallery.insertAdjacentHTML("beforeend", templatesImg(data.hits))
        
}

function onLoadMore() {
   
    newsApiService.fetchPictures()
        .then(renderPictures)
}
    
function clearPictures() {
    refs.gallery.innerHTML = ''; 
}


refs.gallery.addEventListener('click', onreateGalleryMarkup)

function onreateGalleryMarkup(e) {
    e.preventDefault()
    refs.gallery.removeEventListener('click', onreateGalleryMarkup)
   const newGallery = new SimpleLightbox('.gallery a')
   
  
}
  
 

