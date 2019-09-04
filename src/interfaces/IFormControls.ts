export interface IFormControls {
  name: IFormControlContent;
  email: IFormControlContent;
  phone: IFormControlContent;
}

export interface IFormControlContent {
  value: string;
  valid: boolean;
  touched: boolean;
  validationRules: IFormValidationRules;
}

export interface IFormValidationRules {
  isRequired: boolean;
}