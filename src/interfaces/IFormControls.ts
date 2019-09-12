export interface IFormControls {
  name: {
    value: string;
    valid: boolean;
    touched: boolean;
    validationRules: {
      isRequired: boolean;
    };
  };
  email: {
    value: string;
    valid: boolean;
    touched: boolean;
    validationRules: {
      isEmail: boolean;
    };
  };
  phone: {
    value: string;
    valid: boolean;
    touched: boolean;
    validationRules: {
      isNumber: boolean;
      minLength: 3;
    };
  };

}