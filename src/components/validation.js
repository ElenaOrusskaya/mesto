const nameRegex = /^[a-zA-Zа-яА-Я\s\-]+$/;

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
    showInputError(
      formElement,
      formInput,
      formInput.dataset.errorMessage || "Вы пропустили это поле.",
      config
    );
  } else if (
    formInput.dataset.validation === "regex" &&
    !nameRegex.test(formInput.value)
  ) {
    showInputError(
      formElement,
      formInput,
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.",
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
      !formInput.validity.valid ||
      (formInput.dataset.validation === "regex" &&
        !nameRegex.test(formInput.value))
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
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

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

  formButton.disabled = true;
  formButton.classList.add(config.inactiveButtonClass);
};

export const checkImageUrl = (url) => {
  return fetch(url, { method: "HEAD" })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Ошибка при загрузке изображения");
      }
      const contentType = res.headers.get("Content-Type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error("Ссылка не ведет на изображение");
      }
      return true;
    })
    .catch(() => false);
};

export { enableValidation, clearValidation, isValid, showInputError };
