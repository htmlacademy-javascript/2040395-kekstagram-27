import './gallery.js';
import './form.js';
import './validation.js';
import './scale.js';
import './effects.js';
import { hideModal, closeModal } from './form.js';
import { setFormSubmit } from './validation.js';
import { renderPictureContent } from './gallery.js';
import { getData } from './api.js';
import { showLoadingMessage } from './message.js';

showLoadingMessage();
getData(
  (photos) => {
    document.querySelector('.loading').classList.add('hidden');
    renderPictureContent(photos);
  },
  () => {
    showLoadingMessage();
  }
);

setFormSubmit(hideModal, closeModal);
