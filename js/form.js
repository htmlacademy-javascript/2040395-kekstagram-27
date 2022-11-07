import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { onFormChange, resetEffects } from './effects.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const fileInput = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error-message'
}, true);

const isValidTag = (value) => {
  value.trim();
  const tags = value.split(' ');
  return tags.every((tag) => VALID_SYMBOLS.test(tag));
};

pristine.addValidator(
  hashtagField,
  isValidTag,
  `- хэш-тег должен начинаться с решетки (#)<br>
    - хэш-тег не может содержать спецсимволы, эмодзи и знаки пунктуации<br>
    - между хэш-тегами должны стоять пробелы`
);

const hasValidCount = (value) => {
  value.trim();
  const tags = value.split(' ');
  return tags.length <= MAX_HASHTAG_COUNT;
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  `- допустимое количество хэш-тегов: ${MAX_HASHTAG_COUNT}`
);

const hasValidLength = (value) => {
  value.trim();
  const tags = value.split(' ');
  return tags.every((tag) => tag.trim().length <= MAX_HASHTAG_LENGTH);
};

pristine.addValidator(
  hashtagField,
  hasValidLength,
  `- длина хэш-тега не более ${MAX_HASHTAG_LENGTH} символов`
);

const hasUniqueTags = (value) => {
  value.trim();
  const tags = value.split(' ');
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  '- хэш-теги нечувствительны к регистру и не должны повторяться'
);

const validateComments = () => commentField.value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  commentField,
  validateComments,
  `Допустимое количество символов: ${MAX_COMMENT_LENGTH}`
);

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

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
  pristine.reset();
};

const isFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

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
form.addEventListener('submit', onFormSubmit);
