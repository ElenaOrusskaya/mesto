const showInputError = (formElement, formInput, errorMessage, config) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(config.errorClass);
};

const hideInputError = (formElement, formInput, config) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = "";
};

const isValid = (formElement, formInput, config) => {
  if (formInput.validity.valueMissing) {
    showInputError(formElement, formInput, formInput.validationMessage, config);
  } else if (formInput.validity.patternMismatch) {
    showInputError(
      formElement,
      formInput,
      formInput.dataset.errorMessage,
      config
    );
  } else if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, config);
  } else {
    hideInputError(formElement, formInput, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(
    (formInput) =>
      !formInput.validity.valid || formInput.validity.patternMismatch
  );
};

export const toggleButtonState = (inputList, formButton, config) => {
  const hasError = hasInvalidInput(inputList);
  formButton.disabled = hasError;
  formButton.classList.toggle(config.inactiveButtonClass, hasError);
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const formButton = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, formButton, config);

  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(formElement, formInput, config);
      toggleButtonState(inputList, formButton, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const formButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((formInput) => {
    hideInputError(formElement, formInput, config);
  });

  toggleButtonState(inputList, formButton, config);
};

export { enableValidation, clearValidation, isValid, showInputError };
