import './gallery.js';
import { hideModal } from './form.js';
import { setFormSubmit } from './validation.js';
import './scale.js';
import './effects.js';
import { renderPictureContent } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData((photos) => {
  renderPictureContent(photos);
}, showAlert);

setFormSubmit(hideModal);
