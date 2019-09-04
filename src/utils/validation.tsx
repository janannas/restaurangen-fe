import { IFormValidationRules } from "../interfaces/IFormControls";

export const validate = (value: string, rules: IFormValidationRules): boolean => {
  let isValid: boolean = true;

  for (const rule in rules) {
    switch (rule) {
      case "isRequired":
        isValid = requiredValidator(value);

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