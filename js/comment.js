const commentList = document.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment');

const createComment = (item) => {

  const comment = commentItem.cloneNode(true);

  const avatar = comment.querySelector('.social__picture');
  avatar.src = item.avatar;
  avatar.alt = item.name;
  comment.querySelector('.social__text').textContent = item.message;

  return comment;
};

export {commentList, createComment};
