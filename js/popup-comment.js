const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const createComment = (photo) => {

  const comment = commentTemplate.cloneNode(true);

  const avatar = comment.querySelector('.social__picture');
  avatar.src = photo.avatar;
  avatar.alt = photo.name;
  comment.querySelector('.social__text').textContent = photo.message;

  return comment;
};

const renderComments = (comments) => {
  const items = comments.map(createComment);
  commentList.append(...items);
};

const clearComments = () => {
  commentList.innerHTML = '';
};

export {renderComments, clearComments};
