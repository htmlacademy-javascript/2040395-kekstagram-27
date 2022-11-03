import { getPhotoArray } from './data.js';
import { renderPreviews } from './gallery.js';
import './form.js';

const photos = getPhotoArray();

renderPreviews(photos);
