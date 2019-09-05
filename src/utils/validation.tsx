export const validate = (value: any, rules: any): boolean => {
  let isValid: boolean = true;

  for (const rule in rules) {
    switch (rule) {
      case "isRequired":
        isValid = isValid && requiredValidator(value);
        break;

      case "isNumber":
        isValid = isValid && numberValidator(value);
        break;

      case "isEmail":
        isValid = isValid && emailValidator(value);
        break;

      case "minLength":
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;

      case "isChecked":
        isValid = isValid && isCheckedValidator(value);
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
  return !/[a-z]/i.test(value);
}

const emailValidator = (value: string): boolean => {
  const regEx = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regEx.test(String(value).toLowerCase());
}

const minLengthValidator = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
}

const isCheckedValidator = (value: boolean): boolean => {
  return value;
}
