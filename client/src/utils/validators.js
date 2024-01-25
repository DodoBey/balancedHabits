export const passwordValidation = (enteredValue) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const regexResult = regex.test(enteredValue);
  if (enteredValue === '' || !regexResult) {
    return false;
  } else {
    return true;
  }
};

export const emailValidation = (enteredValue) => {
  const regex = /^([^\s\@])+\@(([^\s\@\.])+\.)+([^\s\.]{2,})+$/;
  const regexResult = regex.test(enteredValue);
  if (enteredValue === '' || !regexResult) {
    return false;
  } else {
    return true;
  }
};
