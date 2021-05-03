import pixabayService from './apiService.js';
import refs from './references.js';
import renderHtmlMarkup from './render.js';
import modal from './modal.js';
import notify from './notify.js';


refs.form.addEventListener('submit', submitHandler);
refs.gallery.addEventListener('click', modal.openEvent.bind(modal));

function clearImageContainer() {
  refs.gallery.innerHTML = '';
}

function submitHandler(event) {
  event.preventDefault();
  clearImageContainer();
  const form = event.currentTarget;
  const search = form.elements.query.value.trim();
  form.reset();
  if (search) {
    pixabayService.query = search;
    pixabayService.resetPage();
    pixabayService
      .fetch()
      .then(data => renderHtmlMarkup(data))
      .catch(message => notify.showError(message));

  }

}
