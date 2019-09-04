export const validate = (value: string, rules: any): boolean => {
  let isValid: boolean = true;

  for (const rule in rules) {
    switch (rule) {
      case "isRequired":
        isValid = requiredValidator(value);
        break;

      case "isNumber":
        isValid = numberValidator(value);
        break;

      case "isEmail":
        isValid = emailValidator(value);
        break;

      case "minLength":
        isValid = minLengthValidator(value, rules[rule]);
        break;

      default:
        isValid = true;
    }
  }

  return isValid;
}

const requiredValidator = (value: string): boolean => {
  return value.trim() !== "";
}

const numberValidator = (value: string): boolean => {
  return /^\d+$/.test(value);
}

const emailValidator = (value: string): boolean => {
  const regEx = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regEx.test(String(value).toLowerCase());
}

const minLengthValidator = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
}

