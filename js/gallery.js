import { showBigPhoto, hideBigPhoto, setBigPhotoCloseButtonClickHandler } from './popup.js';
import { createPicture } from './picture.js';
import { isEscapeKey } from './util.js';

const COMMENT_LOAD_STEP = 5;
let count = COMMENT_LOAD_STEP;
let visibleComments = [];

const userPhotoList = document.querySelector('.pictures');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.social__comments-loader');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPhoto();
    count = COMMENT_LOAD_STEP;
    visibleComments = [];
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const renderPreview = (photo) => {
  const picture = createPicture(photo);

  picture.addEventListener('click', (evt) => {
    if (!evt.target.closest('.picture')) {
      return;
    }

    evt.preventDefault();

    showBigPhoto(photo);

    const comments = Array.from(document.querySelector('.social__comments').children);
    for (let i = COMMENT_LOAD_STEP; i < comments.length; i++) {
      comments[i].style.display = 'none';
    }

    const onCommentsLoaderClick = () => {
      count += COMMENT_LOAD_STEP;
      commentCount.textContent = `${count} из ${comments.length} комментариев`;
      visibleComments = comments.slice(0, count);
      visibleComments.forEach((element) => {
        element.style.display = 'flex';
      });
      if (visibleComments.length === comments.length) {
        commentsLoader.classList.add('hidden');
      }
    };

    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);

    setBigPhotoCloseButtonClickHandler(() => {
      hideBigPhoto();
      document.removeEventListener('keydown', onPopupEscKeydown);
      count = COMMENT_LOAD_STEP;
      visibleComments = [];
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
      commentCount.textContent = `${count} из ${comments.length} комментариев`;
    });

    document.addEventListener('keydown', onPopupEscKeydown);
  });

  return picture;
};

const renderPreviews = (photos) => {
  userPhotoList.append(...photos.map(renderPreview));
};

export { renderPreviews };
