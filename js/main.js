import './gallery.js';
import './form.js';
import './validation.js';
import './scale.js';
import './effects.js';
import { getPhotoArray } from './data.js';
import { renderPictureContent } from './gallery.js';

const photos = getPhotoArray();

renderPictureContent(photos);
