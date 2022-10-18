const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhotoItem = (object) => {

  const photoItem = userPhotoTemplate.cloneNode(true);

  photoItem.querySelector('.picture__img').src = object.url;
  photoItem.querySelector('.picture__comments').textContent = object.comments.length;
  photoItem.querySelector('.picture__likes').textContent = object.likes;

  return photoItem;
};

export {createPhotoItem};
