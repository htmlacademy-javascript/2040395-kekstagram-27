import { renderBigPicture } from './big-picture.js';

const userPhoto = document.querySelector('.pictures');
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictureContent = (photos) => {
  const content = photos.map(({
    url,
    likes,
    comments,
    description
  }) => {
    const picture = userPhotoTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.addEventListener('click', () => renderBigPicture(url, likes, comments, description));
    return picture;
  });

  userPhoto.append(...content);
};

export { renderPictureContent };
