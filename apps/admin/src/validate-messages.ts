const typeTemplate = "'${name}' is not a valid ${type}";

export const validateMessages = {
  default: "Валидационная ошибка в поле '${name}'",
  required: 'Это поле обязательное',
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date",
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: 'Некорректный email. Пример корректного: user@example.com',
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "'${name}' must be exactly ${len} символов",
    min: "'${name}' должен быть как минимум ${min} символов",
    max: "'${name}' cannot be longer than ${max} символов",
    range: "'${name}' must be between ${min} and ${max} символов",
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}",
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length",
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}",
  },
};
