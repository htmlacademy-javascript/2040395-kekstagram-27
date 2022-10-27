import { getPhotoArray } from './data.js';
import { renderPreviews } from './gallery.js';

const photos = getPhotoArray();

renderPreviews(photos);
