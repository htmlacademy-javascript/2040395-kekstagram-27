import {commentList, createComment} from './comment.js';

const renderComments = (items) => {
  const comments = [];
  for (let i = 0; i < items.length; i++) {
    comments.push(createComment(items[i]));
  }
  commentList.append(...comments);
};

export {renderComments};
