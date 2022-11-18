import { createMessageStyle } from './util.js';

const ALERT_SHOW_TIME = 10000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  createMessageStyle(alertContainer, message);
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        showAlert('Ошибка загрузки данных!');
        return;
      }
      return response.json();
    })
    .then((photos) => onSuccess(photos))
    .catch(() => {
      showAlert('Ошибка загрузки данных!');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://27.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        onFail();
        return;
      }
      onSuccess();
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
