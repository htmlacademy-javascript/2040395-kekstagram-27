const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = (photo) => {

  const photoItem = userPhotoTemplate.cloneNode(true);

  photoItem.querySelector('.picture__img').src = photo.url;
  photoItem.querySelector('.picture__comments').textContent = photo.comments.length;
  photoItem.querySelector('.picture__likes').textContent = photo.likes;

  return photoItem;
};

export {createPicture};
