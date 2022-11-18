const COMMENT_STEP_COUNT = 5;

const getInitialCommentStateCount = (count = 0) => {
  let countInitialCommentState = count;
  countInitialCommentState += COMMENT_STEP_COUNT;
  return countInitialCommentState;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const removeEventListener = (removeEventListenerWhere, typeOfEvent, onEventFunction) => {
  const element = removeEventListenerWhere;
  element.removeEventListener(typeOfEvent, onEventFunction);
};

const createMessageStyle = (alertContainer, message) => {
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '50px';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '270px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.fontFamily = 'Open Sans';
  alertContainer.style.fontWeight = '700';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgb(255 61 61 / 90%)';
  alertContainer.style.width = '600px';
  alertContainer.style.height = '600px';
  alertContainer.style.margin = '0 auto';
  alertContainer.textContent = message;
};

const createMessageContainer = (message) => {
  const alertContainer = document.createElement('div');
  createMessageStyle(alertContainer, message);
  alertContainer.classList.add('loading', 'hidden');
  document.body.append(alertContainer);
};

export {
  isEscapeKey,
  removeEventListener,
  getInitialCommentStateCount,
  COMMENT_STEP_COUNT,
  createMessageStyle,
  createMessageContainer
};
