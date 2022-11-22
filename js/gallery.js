import { renderBigPicture } from './big-picture.js';

const userPhotoElement = document.querySelector('.pictures');
const userPhotoTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const renderPictureContent = (photos) => {
  const content = photos.map(({
    url,
    likes,
    comments,
    description
  }) => {
    const picture = userPhotoTemplateElement.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.addEventListener('click', () => renderBigPicture(url, likes, comments, description));

    return picture;
  });

  userPhotoElement.append(...content);
};

const removePhotos = () => {
  const images = document.querySelectorAll('.picture');
  if (images) {
    images.forEach((image) => image.remove());
  }
};

export { renderPictureContent, removePhotos };
