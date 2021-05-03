class ModalGalleryForm {
  constructor() {
    this.refs = this.#getReference();
    [this.refs.close, this.refs.overlay].forEach(elm =>
      elm.addEventListener('click', this.hideEvent.bind(this))
    );
  }

  #getReference() {
    const modal = document.querySelector('.js-lightbox');
    const overlay = document.querySelector('.js-lightbox .lightbox__overlay');
    const image = document.querySelector('.js-lightbox .lightbox__image');
    const close = document.querySelector('button[data-action="close-lightbox"]');
    return { modal, overlay, image, close, };
  }

  #initImage(src = '', alt = '') {
    this.refs.image.src = src;
    this.refs.image.alt = alt;
  }

  openEvent(event) {
    event.preventDefault();
    const targetEl = event.target;
    if (targetEl.nodeName === 'IMG') {
      this.refs.modal.classList.add('is-open');
      this.#initImage(targetEl.dataset.source, targetEl.alt);
      window.addEventListener('keydown', this.keyEvent.bind(this));
    }
  }

  hideEvent(event) {
    event.preventDefault();
    this.refs.modal.classList.remove('is-open');
    this.#initImage();
    window.removeEventListener('keydown', this.keyEvent.bind(this));
  }

  keyEvent(event) {
    switch (event.key) {
      case 'Escape':
        this.hideEvent(event);
        break;
    }
  }
};


export default new ModalGalleryForm();
