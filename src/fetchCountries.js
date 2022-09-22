export default class PicturesAPI {
  constructor() {
    this.textSearch = '';
  }

  async getPictures() {
    const API_KEY = '30077123-b07f3bce85b956a1421c5c012';
    const API = 'https://pixabay.com/api';
    const parametersS =
      'image_type=photo&orientation=horizontal&safesearch=true';

    const url = `${API}/?key=${API_KEY}&q=${this.textSearch}&${parametersS}`;
    try {
      const response = await axios.get(url);
      console.log(response);
      const pic = await response.json();
      return pic;
    } catch (error) {
      console.error(error);
    }
  }

  // fetchCountries() {
  //   const url = `https://restcountries.com/v2/name/${this.name}?fields=name,capital,population,flags,languages`;
  //   return fetch(url).then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.status);
  //     }
  //     return response.json();
  //   });
  // }

  get queryPic() {
    return this.textSearch;
  }

  set queryPic(newQueryName) {
    this.textSearch = newQueryName;
  }
}
