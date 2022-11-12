const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const isHashtagValidRegex = /^#[a-zа-яё0-9]{1,19}$/;

const uploadImg = document.querySelector('.img-upload');
const form = uploadImg.querySelector('#upload-select-image');
const inputHashtag = uploadImg.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error-message'
}, true);

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
  return (arrHashtags.length <= HASHTAG_MAX_COUNT);
};

const isHashtagsUnique = (value) => {
  const arrHashtags = getArrHashtags(value);
  const getLowercaseHashtag = arrHashtags.map((hashtag) => hashtag.toLowerCase());
  const set = new Set(getLowercaseHashtag);
  return (set.size === getLowercaseHashtag.length);
};

pristine.addValidator(inputHashtag, isHashtagsCountValid,
  `Количество хэш-тегов не более ${HASHTAG_MAX_COUNT}`
);

pristine.addValidator(inputHashtag, areHashtagsValid,
  `- хэш-тег должен начинаться с решетки (#)<br>
    - хэш-тег не может содержать спецсимволы, эмодзи и знаки пунктуации<br>
    - между хэш-тегами должны стоять пробелы<br>
    - максимальное количество символов в хэш-теге - ${HASHTAG_MAX_LENGTH}`
);

pristine.addValidator(inputHashtag, isHashtagsUnique,
  'Каждый хэш-тег должен быть уникальным'
);

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
  pristine.reset();
};

form.addEventListener('submit', onFormSubmit);
