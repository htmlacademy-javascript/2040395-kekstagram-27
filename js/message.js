import { openModalAndAddEscapeListener } from './form.js';
import {
  isEscapeKey,
  removeEventListener,
  createMessageContainer
} from './util.js';

const errorElement = document.querySelector('.error');
const successElement = document.querySelector('.success');
const errorButtonElement = document.querySelector('.error__button');
const successButtonElement = document.querySelector('.success__button');

const closeMessages = () => {
  errorElement.classList.add('hidden');
  successElement.classList.add('hidden');
};

const onCloseMessageError = () => {
  errorElement.classList.add('hidden');
  openModalAndAddEscapeListener();
};

const onCloseMessageSuccess = () => {
  successElement.classList.add('hidden');
};

const onMessage = (evt) => {
  const parentNodeElement = evt.target.parentNode;

  switch (evt.type) {
    case 'click':
      if (errorElement.classList.contains('hidden')) {
        if (parentNodeElement.classList.contains('success__inner') || parentNodeElement.classList.contains('success')) {
          return;
        }
        onCloseMessageSuccess();
        removeEventListener(successButtonElement, 'click', onCloseMessageSuccess);
        removeEventListener(document, 'keydown', onMessage);
        removeEventListener(document, 'click', onMessage);
        return;
      }
      if (successElement.classList.contains('hidden')) {
        if (parentNodeElement.classList.contains('error__inner') || parentNodeElement.classList.contains('error')) {
          return;
        }
        onCloseMessageError();
        removeEventListener(errorButtonElement, 'click', onCloseMessageError);
        removeEventListener(document, 'keydown', onMessage);
        removeEventListener(document, 'click', onMessage);
      }
      break;
    case 'keydown':
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        if (errorElement.classList.contains('hidden')) {
          onCloseMessageSuccess();
          removeEventListener(successButtonElement, 'click', onCloseMessageSuccess);
          removeEventListener(document, 'keydown', onMessage);
          removeEventListener(document, 'click', onMessage);
          return;
        }
        if (successElement.classList.contains('hidden')) {
          onCloseMessageError();
          removeEventListener(errorButtonElement, 'click', onCloseMessageError);
          removeEventListener(document, 'keydown', onMessage);
          removeEventListener(document, 'click', onMessage);
        }
      }
      break;
    default:
      closeMessages();
      removeEventListener(successButtonElement, 'click', onCloseMessageSuccess);
      removeEventListener(errorButtonElement, 'click', onCloseMessageError);
      removeEventListener(document, 'keydown', onMessage);
      removeEventListener(document, 'click', onMessage);
      break;
  }
};

const showMessageError = () => {
  errorElement.classList.remove('hidden');
  errorButtonElement.addEventListener('click', onCloseMessageError);
  document.addEventListener('keydown', onMessage);
  document.addEventListener('click', onMessage);
};

const showMessageSuccess = () => {
  successElement.classList.remove('hidden');
  successButtonElement.addEventListener('click', onCloseMessageSuccess);
  document.addEventListener('keydown', onMessage);
  document.addEventListener('click', onMessage);
};

const showLoadingMessage = () => {
  createMessageContainer('Идет загрузка...');
  document.querySelector('.loading').classList.remove('hidden');
};

export { showMessageError, showMessageSuccess, showLoadingMessage };
