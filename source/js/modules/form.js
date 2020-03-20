'use strict';

(function () {
  const SUCCESS_CODE = 200;
  const form = document.querySelector('.js-form form');
  const inputs = [].map.call(document.querySelectorAll('.js-input input, .js-input textarea'), function(it) {
    return it;
  });
  const telInput = document.querySelector('.js-tel input');
  const submitBtn = document.querySelector('.js-form button');

  if (inputs.length) {
    inputs.forEach(function(input) {
      input.addEventListener('focus', function() {
        input.parentElement.classList.add('is-filled');
      });

      input.addEventListener('blur', function() {
        if (!input.value) {
          input.parentElement.classList.remove('is-filled');
        }
      });
    });
  }

  if (telInput) {
    let telMask = new IMask(telInput, {
      mask: '+{7} (000) 000 - 00 - 00',
      lazy: true,
      placeholderChar: ' '
    });

    telInput.addEventListener('focus', function() {
      telMask.updateOptions({ lazy: false });
    }, true);

    telInput.addEventListener('blur', function() {
      telMask.updateOptions({ lazy: true });
      if (!telMask.masked.rawInputValue) {
        telMask.value = '';
        telInput.parentElement.classList.remove('is-filled');
      }
    }, true);
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', function(evt) {
      evt.preventDefault();

      let isValid = validateFormData();

      if (isValid) {
        sendFormData();
      }
    });
  }

  function validateFormData() {
    let isValid = true;

    inputs.forEach(function(input) {
      if (!input.validity.valid) {
        input.classList.add('is-invalid');
        input.addEventListener('input', onInputChange);
        isValid = false;
      }

      function onInputChange() {
        input.classList.remove('is-invalid');
        input.removeEventListener('input', onInputChange);
      }
    });

    if (telInput.value.length < 22) {
      telInput.classList.add('is-invalid');
      telInput.addEventListener('input', onTelInputChange);
      isValid = false;
    }

    function onTelInputChange() {
      telInput.classList.remove('is-invalid');
      telInput.removeEventListener('input', onTelInputChange);
    }

    return isValid;
  }

  function sendFormData() {
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();

    xhr.open('POST', form.action);
    xhr.send(formData);

    xhr.addEventListener('load', function() {
      if (xhr.status === SUCCESS_CODE) {
        form.parentElement.classList.add('is-success');
      }
    });
  }
})();
