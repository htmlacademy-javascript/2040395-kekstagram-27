const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const createComment = (photo) => {
  const comment = commentTemplate.cloneNode(true);
  const {avatar, name, message} = photo;
  const avatarPicture = comment.querySelector('.social__picture');
  avatarPicture.src = avatar;
  avatarPicture.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentList.append(...comments.map(createComment));
};

const clearComments = () => {
  commentList.replaceChildren();
};

export { renderComments, clearComments };
