import { isEscapeKey } from './util.js';

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
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

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  `Пожалуйста убедитесь, что:<br>
    - хештег начинается с решетки (#)<br>
    - хештег не содержит спецсимволы, эмодзи и знаки пунктуации<br>
    - длина хештега не более 20 символов<br>
    - количество хештегов не более ${MAX_HASHTAG_COUNT}<br>
    - между хештегами стоят пробелы`
);

const validateComments = () => {
  const comment = commentField.value;
  if (comment.length <= MAX_COMMENT_LENGTH) {
    return true;
  }
};

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

let handleCancelButtonClick = null;

const setCancelButtonClickHandler = (callback) => {
  handleCancelButtonClick = callback;
};

const onCancelButtonClick = (evt) => {
  evt.preventDefault();

  handleCancelButtonClick?.();
};

const showModal = () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  cancelButton.addEventListener('click', onCancelButtonClick);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelButton.removeEventListener('click', onCancelButtonClick);
};

const isFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();

    hideModal();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const setModalHandlers = () => {

  fileInput.addEventListener('change', () => {
    showModal();
    setCancelButtonClickHandler(() => {
      hideModal();
      document.removeEventListener('keydown', onPopupEscKeydown);
    });
    document.addEventListener('keydown', onPopupEscKeydown);
  });

  form.addEventListener('submit', onFormSubmit);
};

setModalHandlers();
