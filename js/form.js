import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { onFormChange, resetEffects } from './effects.js';
import './upload-validation.js';

const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const inputHashtag = form.querySelector('.text__hashtags');
const inputComment = form.querySelector('.text__description');


const showModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideModal = () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetScale();
  resetEffects();
  form.reset();
};

const isFieldFocused = () => document.activeElement === inputHashtag || document.activeElement === inputComment;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();

    hideModal();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const onCancelButtonClick = () => {
  hideModal();
  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

fileInput.addEventListener('change', () => {
  showModal();
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);
});

form.addEventListener('change', onFormChange);
