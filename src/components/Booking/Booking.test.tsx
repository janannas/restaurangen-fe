import React from 'react';
import Booking from './Booking';

import { shallow } from 'enzyme';
import '../../setupTests';

describe('Booking Component', () => {
  it('contains a header with "Booking works"', () => {
    const test = shallow(<Booking />);
    expect(test.containsMatchingElement(<h1>Booking works</h1>)).toEqual(true);
  })
})