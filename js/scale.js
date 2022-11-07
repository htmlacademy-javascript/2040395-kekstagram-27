const SCALE_MAX = 100;
const SCALE_MIN = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview');

const getScaleValue = (stepOperator = 1) => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP * stepOperator;
  if (newValue < SCALE_MIN) {
    newValue = SCALE_MIN;
  } else if (newValue > SCALE_MAX) {
    newValue = SCALE_MAX;
  }
  return newValue;
};

const scaleImage = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const scaleValue = getScaleValue(-1);
  scaleImage(scaleValue);
};

const onBiggerButtonClick = () => {
  const scaleValue = getScaleValue();
  scaleImage(scaleValue);
};

const resetScale = () => {
  scaleImage();
};

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export {resetScale};
