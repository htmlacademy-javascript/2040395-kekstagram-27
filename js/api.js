const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        onFail();
        return;
      }
      return response.json();
    })
    .then((photos) => onSuccess(photos))
    .catch(() => {
      onFail();
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

