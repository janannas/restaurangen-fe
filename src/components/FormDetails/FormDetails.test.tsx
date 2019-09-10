import React from 'react';
import { mount } from 'enzyme';
import FormDetails from '../FormDetails/FormDetails';

describe('FormDetails component', () => {
  let props: any = {};
  let FormDetailsInstance: any;

  beforeEach(() => {
    FormDetailsInstance = mount<FormDetails>(
      <FormDetails {...props} />
    );
  });

  afterEach(() => {
    FormDetailsInstance.unmount();
  });

  describe('when the value of its input is changed', () => {
    it('its state should be changed', () => {
      const newValue = 'new name';
      const input = FormDetailsInstance.find('input').first();

      expect(input).toHaveLength(1);

      input.simulate('change', { target: { name: 'name', value: newValue } });

      expect(FormDetailsInstance.state().formControls.name["value"]).toEqual(newValue);
    });
  });
}); 