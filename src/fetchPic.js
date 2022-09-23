import axios from 'axios';

export default class PicturesApiSeartch {
  constructor() {
    this.textSearch = '';
    this.page = 1;
  }

  async getPictures() {
    const config = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '30077123-b07f3bce85b956a1421c5c012',
        q: `${this.textSearch}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: `${this.page}`,
      },
    };

    try {
      const response = await axios(config);
      console.log(response);

      const data = response.data;
      console.log(data);
      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  clearPage() {
    this.page = 1;
  }

  get queryPic() {
    return this.textSearch;
  }

  set queryPic(newQueryName) {
    this.textSearch = newQueryName;
  }
}
