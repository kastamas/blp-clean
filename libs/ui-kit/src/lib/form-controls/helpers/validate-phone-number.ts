import parsePhoneNumber from 'libphonenumber-js';

export const validatePhoneNumber = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value) {
      return Promise.resolve();
    }

    if (value) {
      const phoneNumber = parsePhoneNumber(value, 'RU');

      if (phoneNumber) {
        if (phoneNumber.isValid()) {
          return Promise.resolve();
        }
      }
    }

    return Promise.reject(new Error('Некорректный номер телефона!'));
  },
});
