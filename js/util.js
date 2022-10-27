const checkTextLength = (text, maxlength) => text.length <= maxlength;

const isEscapeKey = (evt) => evt.key === 'Escape';

export { checkTextLength, isEscapeKey };
