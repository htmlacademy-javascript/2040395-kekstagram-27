import { sendData } from './api.js';
import { showMessageError, showMessageSuccess } from './message.js';

const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const isHashtagValidRegex = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/;

const uploadImgElement = document.querySelector('.img-upload');
const formElement = uploadImgElement.querySelector('#upload-select-image');
const hashtagInputElement = uploadImgElement.querySelector('.text__hashtags');
const submitButtonElement = uploadImgElement.querySelector('.img-upload__submit');

const pristine = new Pristine(
  formElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'error-message',
  },
  true
);

const getArrHashtags = (value) => value.split(' ');

const isHashtagValid = (value) => isHashtagValidRegex.test(value);

const areHashtagsValid = (value) => {
  const arrHashtags = getArrHashtags(value);
  if (value.length === 0 && arrHashtags.length === 1) {
    return true;
  }
  return arrHashtags.every((hashtag) => isHashtagValid(hashtag));
};

const isHashtagsCountValid = (value) => {
  const arrHashtags = getArrHashtags(value);
  return arrHashtags.length <= HASHTAG_MAX_COUNT;
};

const isHashtagsUnique = (value) => {
  const arrHashtags = getArrHashtags(value);
  const getLowercaseHashtag = arrHashtags.map((hashtag) =>
    hashtag.toLowerCase()
  );
  const set = new Set(getLowercaseHashtag);
  return set.size === getLowercaseHashtag.length;
};

pristine.addValidator(
  hashtagInputElement,
  isHashtagsCountValid,
  `Количество хэш-тегов не более ${HASHTAG_MAX_COUNT}`
);

pristine.addValidator(
  hashtagInputElement,
  areHashtagsValid,
  `- хэш-тег должен начинаться с решетки (#)<br>
    - хэш-тег не может содержать спецсимволы, эмодзи и знаки пунктуации<br>
    - между хэш-тегами должны стоять пробелы<br>
    - максимальное количество символов в хэш-теге - ${HASHTAG_MAX_LENGTH}`
);

pristine.addValidator(
  hashtagInputElement,
  isHashtagsUnique,
  'Каждый хэш-тег должен быть уникальным'
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Идет отправка...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const setFormSubmit = (onSuccess, onError) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showMessageSuccess();
          unblockSubmitButton();
        },
        () => {
          onError();
          showMessageError();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

export { setFormSubmit };
