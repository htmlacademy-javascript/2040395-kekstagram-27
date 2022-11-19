import { openModalAndAddEscapeListener } from './form.js';
import {
  isEscapeKey,
  removeEventListener,
  createMessageContainer
} from './util.js';

const error = document.querySelector('.error');
const success = document.querySelector('.success');
const errorButton = document.querySelector('.error__button');
const successButton = document.querySelector('.success__button');

const closeMessages = () => {
  error.classList.add('hidden');
  success.classList.add('hidden');
};

const onCloseMessageError = () => {
  error.classList.add('hidden');
  openModalAndAddEscapeListener();
};

const onCloseMessageSuccess = () => {
  success.classList.add('hidden');
};

const onMessage = (evt) => {
  const parentNodeElement = evt.target.parentNode;

  switch (evt.type) {
    case 'click':
      if (error.classList.contains('hidden')) {
        if (parentNodeElement.classList.contains('success__inner') || parentNodeElement.classList.contains('success')) {
          return;
        }
        onCloseMessageSuccess();
        removeEventListener(successButton, 'click', onCloseMessageSuccess);
        removeEventListener(document, 'keydown', onMessage);
        removeEventListener(document, 'click', onMessage);
        return;
      }
      if (success.classList.contains('hidden')) {
        if (parentNodeElement.classList.contains('error__inner') || parentNodeElement.classList.contains('error')) {
          return;
        }
        onCloseMessageError();
        removeEventListener(errorButton, 'click', onCloseMessageError);
        removeEventListener(document, 'keydown', onMessage);
        removeEventListener(document, 'click', onMessage);
      }
      break;
    case 'keydown':
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        if (error.classList.contains('hidden')) {
          onCloseMessageSuccess();
          removeEventListener(successButton, 'click', onCloseMessageSuccess);
          removeEventListener(document, 'keydown', onMessage);
          removeEventListener(document, 'click', onMessage);
          return;
        }
        if (success.classList.contains('hidden')) {
          onCloseMessageError();
          removeEventListener(errorButton, 'click', onCloseMessageError);
          removeEventListener(document, 'keydown', onMessage);
          removeEventListener(document, 'click', onMessage);
        }
      }
      break;
    default:
      closeMessages();
      removeEventListener(successButton, 'click', onCloseMessageSuccess);
      removeEventListener(errorButton, 'click', onCloseMessageError);
      removeEventListener(document, 'keydown', onMessage);
      removeEventListener(document, 'click', onMessage);
      break;
  }
};

const showMessageError = () => {
  error.classList.remove('hidden');
  errorButton.addEventListener('click', onCloseMessageError);
  document.addEventListener('keydown', onMessage);
  document.addEventListener('click', onMessage);
};

const showMessageSuccess = () => {
  success.classList.remove('hidden');
  successButton.addEventListener('click', onCloseMessageSuccess);
  document.addEventListener('keydown', onMessage);
  document.addEventListener('click', onMessage);
};

const showLoadingMessage = () => {
  createMessageContainer('Идет загрузка...');
  document.querySelector('.loading').classList.remove('hidden');
};

export { showMessageError, showMessageSuccess, showLoadingMessage };
