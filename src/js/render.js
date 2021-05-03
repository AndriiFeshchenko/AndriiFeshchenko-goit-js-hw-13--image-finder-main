import imageTpl from '../templates/image-item.hbs';
import refs from './references.js';
import pixabayService from './apiService.js';
import notify from './notify.js';

const pageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        pixabayService
          .fetch()
          .then(data => renderHtmlMarkup(data))
          .catch(message => notify.showError(message));
      }
    });
  },
  {
    rootMargin: '-10px',
  },
);

function renderHtmlMarkup({ hits }) {
  refs.gallery.insertAdjacentHTML('beforeend', imageTpl(hits));
  notify.showSuccess(pixabayService.page, pixabayService.pagination);
  if (!pixabayService.isLastPage) {
    pageObserver.observe(refs.gallery.lastElementChild);
  }
}

export default renderHtmlMarkup;
