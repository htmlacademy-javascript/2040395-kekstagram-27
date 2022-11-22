const SCALE_MAX = 100;
const SCALE_MIN = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;
const DECIMAL_TRANSFER = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const getScaleValue = (stepOperator) => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  let newValue = currentValue + SCALE_STEP * stepOperator;
  if (newValue < SCALE_MIN) {
    newValue = SCALE_MIN;
  } else if (newValue > SCALE_MAX) {
    newValue = SCALE_MAX;
  }
  return newValue;
};

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / DECIMAL_TRANSFER})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const scaleValue = getScaleValue(-1);
  scaleImage(scaleValue);
};

const onBiggerButtonClick = () => {
  const scaleValue = getScaleValue(1);
  scaleImage(scaleValue);
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetScale };
