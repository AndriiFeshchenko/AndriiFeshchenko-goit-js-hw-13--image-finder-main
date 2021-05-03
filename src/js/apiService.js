class PixabayImagesAPI {
  #searchQuery = '';
  #page = 1;
  #pagination = 12;
  #key = '21129033-533ef8f2fd9810bb53beb1a5f';
  #lastPage
  constructor() { }



  get page() {
    return this.#page;
  }
  set page(page) {
    this.#page = page;
  }

  get isLastPage() {
    return this.#lastPage;
  }


  get pagination() {
    return this.#pagination;
  }
  set pagination(pagination) {
    this.#pagination = pagination;
  }

  get query() {
    return this.#searchQuery;
  }
  set query(query) {
    this.#searchQuery = encodeURIComponent(query);
  }

  resetPage() {
    this.#page = 1;
  }

  async fetch() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.#searchQuery}&page=${this.#page}&per_page=${this.#pagination}&key=${this.#key}`;
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      this.#page += 1;
      const { totalHits, hits } = jsonData
      this.#lastPage = !((hits.length) && ((this.#page - 1) * this.#pagination < totalHits))
      return jsonData;
    } catch (error) {
      throw error;
    }
  }
}

// fetch() {
//   const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this._searchQuery}&page=${this._page}&per_page=${this._pagination}&key=${this._key}`;
//   return fetch(url)
//     .then(response => response.json())
//     .then(response => {
//       this._page += 1;
//       return response;
//     })
// }

export default new PixabayImagesAPI();
