import * as msgType from "./ValidationMsg";

var _ = require("lodash");

export const validationInit = (key, str) => {
  switch (key) {
    case "title":
      return isEmptyCheckerAndIfString(str,key);
    case "author":
      return isEmptyCheckerAndIfString(str,key);
    case "date":
      return isDateValidation(str);
    case "id":
      return null;
    default:
      return null;
  }
};

export const isEmptyCheckerAndIfString = (str,key) => {
  if (_.trim(str) === "" || str === undefined || str === null) {
    return msgType.MUST_HAVE_INPUT;
  }
  if (!isNaN(str)&& key==="author") {
    return msgType.MUST_BE_A_STRING;
  }
  return null;
};

export const isDateValidation = date => {
  if (_.trim(date) === "" || date === undefined || date === null) {
    return msgType.MUST_HAVE_INPUT;
  }
  if (!date.match(/^[0-9]+$/)) {
    return msgType.NOT_A_NUMBER;
  }
  if (date.length > 4 || date.length < 4) {
    return msgType.DATE_NOT_VALID;
  }

  return null;
};
