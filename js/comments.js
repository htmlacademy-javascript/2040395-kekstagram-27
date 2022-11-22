const commentListElement = document.querySelector('.social__comments');
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');

const createComment = (photo) => {
  const comment = commentTemplateElement.cloneNode(true);
  const { avatar, name, message } = photo;
  const avatarPicture = comment.querySelector('.social__picture');

  avatarPicture.src = avatar;
  avatarPicture.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderComment = (comment) => createComment(comment);

const renderComments = (comments) => {
  commentListElement.append(...comments.map(renderComment));
};

const clearComments = () => {
  commentListElement.replaceChildren();
};

export { renderComments, clearComments };
