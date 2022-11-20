import { shuffleArray, debounce } from './util.js';
import { renderPictureContent, removePhotos } from './gallery.js';

const RANDOM_IMAGE_MAX = 10;

const imageFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

const getImageRank = (image) => {
  const rank = image.comments.length;
  return rank;
};

const compareImages = (imageA, imageB) => {
  const rankA = getImageRank(imageA);
  const rankB = getImageRank(imageB);

  return rankB - rankA;
};

const filterByCommentsNumber = (images) => {
  const popularImages = images.slice();
  return popularImages.sort(compareImages);
};

const filterRandom = (images) => {
  const randomImages = shuffleArray(images.slice());
  return randomImages.slice(0, RANDOM_IMAGE_MAX);
};

const filterDefault = (images) => {
  const defaultImages = images.slice();
  return defaultImages;
};

const onFilterButton = (button, photos) => {
  switch (button) {
    case discussedButton:
      removePhotos();
      renderPictureContent(filterByCommentsNumber(photos));
      break;
    case randomButton:
      removePhotos();
      renderPictureContent(filterRandom(photos));
      break;
    case defaultButton:
      removePhotos();
      renderPictureContent(filterDefault(photos));
      break;
    default:
      removePhotos();
      renderPictureContent(filterDefault(photos));
      break;
  }
};

const onFilterButtonClick = (button, photos) => {
  const active = 'img-filters__button--active';

  button.addEventListener('click', () => {
    if (!button.classList.contains(active)) {
      filterButtons.forEach((item) => {
        item.classList.remove(active);
      });

      button.classList.add(active);
      onFilterButton(button, photos);
    }
  });
};

const filterPictureContent = (photos) => {
  imageFilters.classList.remove('img-filters--inactive');
  filterButtons.forEach((button) => debounce(onFilterButtonClick(button, photos)));
};

export { filterPictureContent };
