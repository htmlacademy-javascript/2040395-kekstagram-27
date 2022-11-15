const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch(() => {
      onFail('Не удалось подключиться к серверу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму');
    });
};

export { getData, sendData };
