import { shuffleArray, debounce } from './util.js';
import { renderPictureContent, removePhotos } from './gallery.js';

const RANDOM_IMAGE_MAX = 10;
const TIMEOUT_DELAY = 500;

const imageFiltersElement = document.querySelector('.img-filters');
const filterButtonElements = document.querySelectorAll('.img-filters__button');
const defaultButtonElement = document.querySelector('#filter-default');
const randomButtonElement = document.querySelector('#filter-random');
const discussedButtonElement = document.querySelector('#filter-discussed');

const getImageRank = (image) => image.comments.length;

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

const filterDefault = (images) => images.slice();

const onFilterButton = (button, photos) => {
  switch (button) {
    case discussedButtonElement:
      removePhotos();
      renderPictureContent(filterByCommentsNumber(photos));
      break;
    case randomButtonElement:
      removePhotos();
      renderPictureContent(filterRandom(photos));
      break;
    case defaultButtonElement:
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
      filterButtonElements.forEach((item) => {
        item.classList.remove(active);
      });

      button.classList.add(active);
      onFilterButton(button, photos);
    }
  });
};

const filterPictureContent = (photos) => {
  imageFiltersElement.classList.remove('img-filters--inactive');
  filterButtonElements.forEach((button) => debounce(onFilterButtonClick(button, photos), TIMEOUT_DELAY));
};

export { filterPictureContent };
