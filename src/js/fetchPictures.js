const API_KEY = '25450626-7cb2b35c2e185bf8ce50545ef'
const BASE_URL = 'https://pixabay.com/api/'
import axios from 'axios';
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchPictures() {
    console.log(this)
    let options = {
      params: {
        key: API_KEY,
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: 29,
      },
    };
    const response = await axios.get(`${BASE_URL}`, options)
    this.page += 1;
    return response.data 
    
  }

  resetPage() {
   this.page = 1; 
}
  get query() {
   return this.searchQuery
  }
  set query(newQuery) {
    this.searchQuery = newQuery
  }
}



  


 
  
  