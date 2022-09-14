import axios from "axios";
const BASE_URL = "https://pixabay.com/api/";

export class searchQuery {
   
   static page = 1;
   static image_type = "photo";
   static key = '29904861-3a00656c8c471d49ecd8a16bd';
   static query = '';
   static orientation ='horizontal';
   static safesearch = 'true';
   static per_page = 60;
   static totalHits = 500;

   static async searchPictures(query = '') {
    if(query) {
        searchQuery.query = query;
    }
    
   const config = {
        params: {
            key: searchQuery.key,
            q: searchQuery.query,
            image_type: searchQuery.image_type,
            orientation: searchQuery.orientation,
            safesearch: searchQuery.safesearch,
            per_page: searchQuery.per_page,
            page: searchQuery.page,
            totalHits: searchQuery.totalHits,
        }
       }

       const response = await axios.get(`${BASE_URL}`, config);
       return response.data;
   }

};