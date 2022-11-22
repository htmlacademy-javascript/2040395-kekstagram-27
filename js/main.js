import './gallery.js';
import './filters.js';
import './preview.js';
import './form.js';
import './validation.js';
import './scale.js';
import './effects.js';
import { hideModalAndRemoveAllListener, closeModalAndRemoveEscapeListener } from './form.js';
import { setFormSubmit } from './validation.js';
import { renderPictureContent } from './gallery.js';
import { getData } from './api.js';
import { showLoadingMessage } from './message.js';
import { filterPictureContent } from './filters.js';

showLoadingMessage();

getData(
  (photos) => {
    document.querySelector('.loading').classList.add('hidden');
    renderPictureContent(photos);
    filterPictureContent(photos);
  }
);

setFormSubmit(hideModalAndRemoveAllListener, closeModalAndRemoveEscapeListener);
