import { COMMENT_STEP_COUNT, getInitialCommentStateCount } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const countSocialCommentElement = bigPictureElement.querySelector('.social__comment-count');
const socialCommentLoaderButtonElement = bigPictureElement.querySelector('.social__comments-loader');

let countInitialCommentState = getInitialCommentStateCount(0);
const countCommentStep = COMMENT_STEP_COUNT;

const getCommentsData = () => Array.from(bigPictureElement.querySelectorAll('.social__comment'));

const getHiddenCommentsData = () => Array.from(bigPictureElement.querySelectorAll('.social__comment.hidden'));

const createSocialCommentsCounterTemplate = (countInitCommentStep) => (
  `${countInitCommentStep} из <span class="comments-count"> ${getCommentsData().length} </span> комментариев`
);

const clearCommentMarkupCounterState = () => {
  countSocialCommentElement.textContent = '';
  countSocialCommentElement.insertAdjacentHTML('afterbegin', createSocialCommentsCounterTemplate(countCommentStep));
};

const hideSocialCommentsLoader = () => {
  socialCommentLoaderButtonElement.classList.add('hidden');
  countInitialCommentState = getInitialCommentStateCount(0);
};

const onSocialComments = () => {
  const arrSocialComments = getCommentsData();
  const showFollowComments = arrSocialComments.slice(countInitialCommentState, countInitialCommentState + countCommentStep);
  showFollowComments.forEach((element) => element.classList.remove('hidden'));

  countInitialCommentState += countCommentStep;

  countSocialCommentElement.textContent = '';
  countSocialCommentElement.insertAdjacentHTML('afterbegin', createSocialCommentsCounterTemplate(arrSocialComments.length - getHiddenCommentsData().length));

  if (countInitialCommentState === arrSocialComments.length || countInitialCommentState > arrSocialComments.length) {
    hideSocialCommentsLoader();
  }
};

const uploadMoreComment = () => {
  const arrSocialComments = getCommentsData();
  if (((getCommentsData().length < countCommentStep) || (getCommentsData().length === countCommentStep)) && (getHiddenCommentsData().length === 0)) {
    countSocialCommentElement.textContent = '';
    countSocialCommentElement.insertAdjacentHTML('afterbegin', createSocialCommentsCounterTemplate(getCommentsData().length));
    hideSocialCommentsLoader();
    return;
  }
  arrSocialComments
    .slice(countCommentStep)
    .forEach((elem) => elem.classList.add('hidden'));

  countInitialCommentState = getInitialCommentStateCount(0);
};

const addEventListenerSocialCommentsLoader = () => {
  socialCommentLoaderButtonElement.addEventListener('click', onSocialComments);
};

export {
  uploadMoreComment,
  clearCommentMarkupCounterState,
  onSocialComments,
  addEventListenerSocialCommentsLoader
};
