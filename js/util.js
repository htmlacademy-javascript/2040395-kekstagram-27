const COMMENT_STEP_COUNT = 5;
const ALERT_SHOW_TIME = 3000;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.fontFamily = 'Open Sans';
  alertContainer.style.fontWeight = '700';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgba(255, 61, 61, 0.7)';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onButtonClick = (onWhat, element) => {
  element.remove();
};

const onDocumentClick = (evt, element) => {
  if (evt.target.contains(element)) {
    element.remove();
  }
};

const onMessageKeydown = (evt, element) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    element.remove();
  }
};

const showSuccessMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  document.body.append(message);

  const successMessage = document.querySelector('.success');
  const button = document.querySelector('.success__button');

  button.addEventListener('click', () => {
    onButtonClick(button, successMessage);
  });
  document.addEventListener('click', (evt) => {
    onDocumentClick(evt, successMessage);
  });
  document.addEventListener('keydown', (evt) => {
    onMessageKeydown(evt, successMessage);
  });
};

const showErrorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.append(message);

  const errorMessage = document.querySelector('.error');
  const button = errorMessage.querySelector('.error__button');
  button.addEventListener('click', () => {
    onButtonClick(button, errorMessage);
  });
  document.addEventListener('click', (evt) => {
    onDocumentClick(evt, errorMessage);
  });
  document.addEventListener('keydown', (evt) => {
    onMessageKeydown(evt, errorMessage);
  });
};

export { isEscapeKey, removeEventListener, getInitialCommentStateCount, COMMENT_STEP_COUNT, showAlert, showErrorMessage, showSuccessMessage };

