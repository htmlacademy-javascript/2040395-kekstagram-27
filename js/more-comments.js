import { COMMENT_STEP_COUNT, getInitialCommentStateCount } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const countSocialComment = bigPicture.querySelector('.social__comment-count');
const socialCommentLoaderButton = bigPicture.querySelector('.social__comments-loader');

let countInitialCommentState = getInitialCommentStateCount(0);
const countCommentStep = COMMENT_STEP_COUNT;

const getCommentsData = () => {
  const socialComments = Array.from(bigPicture.querySelectorAll('.social__comment'));
  return socialComments;
};

const getHiddenCommentsData = () => {
  const socialHiddenComments = Array.from(bigPicture.querySelectorAll('.social__comment.hidden'));
  return socialHiddenComments;
};

const createSocialCommentsCounterTemplate = (countInitCommentStep) => (
  `${countInitCommentStep} из <span class="comments-count"> ${getCommentsData().length} </span> комментариев`
);

const clearCommentMarkupCounterState = () => {
  countSocialComment.textContent = '';
  countSocialComment.insertAdjacentHTML('afterbegin', createSocialCommentsCounterTemplate(countCommentStep));
};

const hideSocialCommentsLoader = () => {
  socialCommentLoaderButton.classList.add('hidden');
  countInitialCommentState = getInitialCommentStateCount(0);
};

const onSocialComments = () => {
  const arrSocialComments = getCommentsData();
  const showFollowComments = arrSocialComments.slice(countInitialCommentState, countInitialCommentState + countCommentStep);
  showFollowComments.forEach((element) => element.classList.remove('hidden'));

  countInitialCommentState += countCommentStep;

  countSocialComment.textContent = '';
  countSocialComment.insertAdjacentHTML('afterbegin', createSocialCommentsCounterTemplate(arrSocialComments.length - getHiddenCommentsData().length));

  if (countInitialCommentState === arrSocialComments.length || countInitialCommentState > arrSocialComments.length) {
    hideSocialCommentsLoader();
  }
};

const uploadMoreComment = () => {
  const arrSocialComments = getCommentsData();
  if (((getCommentsData().length < countCommentStep) || (getCommentsData().length === countCommentStep)) && (getHiddenCommentsData().length === 0)) {
    countSocialComment.textContent = '';
    countSocialComment.insertAdjacentHTML('afterbegin', createSocialCommentsCounterTemplate(getCommentsData().length));
    hideSocialCommentsLoader();
    return;
  }
  arrSocialComments
    .slice(countCommentStep)
    .forEach((elem) => elem.classList.add('hidden'));

  countInitialCommentState = getInitialCommentStateCount(0);
};

const addEventListenerSocialCommentsLoader = () => {
  socialCommentLoaderButton.addEventListener('click', onSocialComments);
};

export {
  uploadMoreComment,
  clearCommentMarkupCounterState,
  onSocialComments,
  addEventListenerSocialCommentsLoader
};
