import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const { error, success } = require('@pnotify/core');


const messages = function () {
  const options = {
    text: '',
    title: '',
    styling: 'brighttheme',
    icons: 'brighttheme',
    animation: 'fade',
    animateSpeed: 'slow',
  };
  return {
    showSuccess(page, pagination, opt = {}) {
      const shift = (page - 2) * pagination;
      success({
        ...options, ...{
          type: 'success',
          title: `Fetched data: page # ${page - 1}`,
          text: `Render images: ${1 + shift} - ${shift + pagination} \n\n`,
          delay: 500,
          sticker: false,
          maxTextHeight: null,
        }
      });
    },
    showError(message) {
      error({
        ...options, ...{
          type: 'error',
          title: `Error fetching data`,
          text: `Message ${message}`,
          delay: 3000,
          width: '350px',
          sticker: false,
          maxTextHeight: null,
        }
      });
    }
  }
}



export default messages();