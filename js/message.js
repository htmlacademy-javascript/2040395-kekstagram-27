import { isEscapeKey, removeEventListener, createMessageContainer } from './util.js';

const body = document.querySelector('body');
const uploadImg = document.querySelector('.img-upload');
const uploadModal = uploadImg.querySelector('.img-upload__overlay');
const error = document.querySelector('.error');
const success = document.querySelector('.success');
const errorButton = document.querySelector('.error__button');
const successButton = document.querySelector('.success__button');

const openModalForResendData = () => {
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeMessages = () => {
  error.classList.add('hidden');
  success.classList.add('hidden');
};

const onCloseMessageError = () => {
  error.classList.add('hidden');
  openModalForResendData();
};

const onCloseMessageSuccess = () => {
  success.classList.add('hidden');
};

const onMessage = (evt) => {
  switch (evt.type) {
    case 'click':
      if (error.classList.contains('hidden')) {
        if (evt.target.classList.contains('success__inner')) {
          return;
        }
        onCloseMessageSuccess();
        removeEventListener(successButton, 'click', onCloseMessageSuccess);
        removeEventListener(document, 'keydown', onMessage);
        removeEventListener(document, 'click', onMessage);
        return;
      }
      if (success.classList.contains('hidden')) {
        if (evt.target.classList.contains('error__inner')) {
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
