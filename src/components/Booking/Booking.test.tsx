import React from 'react';
import { shallow, mount } from 'enzyme';
import Booking from './Booking';

describe('Booking Component', () => {
  let props: any = {};
  let BookingInstance: any;

  beforeEach(() => {
    BookingInstance = mount<Booking>(
      <Booking {...props} />
    );
  });

  afterEach(() => {
    BookingInstance.unmount();
  });

  it('contains a header with "Booking works"', () => {
    const test = shallow(<Booking />);
    expect(test.containsMatchingElement(<h2>Place booking</h2>)).toEqual(true);
  });

  describe('when the button is clicked with the input filled out', () => {
    it('a post request should be made', () => {
      const postSpy = spyOn(BookingInstance.instance(), 'handleDetailSubmit');

      BookingInstance.instance().setState({
        dateTime: {
          date: "2019-09-11",
          time: "18:00"
        },
        guests: 2,
        details: {
          name: "Jeppe",
          email: "jeppe93@gmail.com",
          phone: "0123456789"
        }
      });

      const form = BookingInstance.find('form').first();
      expect(form).toHaveLength(1);

      form.simulate('submit');

      expect(postSpy).toHaveBeenCalledTimes(1);
    });
  });
});

