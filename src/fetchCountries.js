export default class CountriesApiServises {
  constructor() {
    this.name = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v2/name/${this.name}?fields=name,capital,population,flags,languages`;
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  get queryName() {
    return this.name;
  }

  set queryName(newQueryName) {
    this.name = newQueryName;
  }
}
