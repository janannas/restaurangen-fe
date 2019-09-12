import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './Admin';
import { shallow } from 'enzyme';
import '../../setupTests';


//Enzyme testing
describe('First React component test with Enzyme', () => {
  let props = {
    history: {
      push: ''
    }
  };

  it('renders without crashing', () => {
    shallow(<Admin {...props}/>);
  });

  //Jest testing
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Admin {...props}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('should fetch mockBooking', () => {
  
  const mockBooking = [{
    booking_ID: 10,
    customer_ID: 111,
    guests: 6,
    sitting: "2019-10-28 18:00:00",
    name: "Fanny-Manny",
    email: "fanny-manny@me.com",
    phone: "070123456"
  }];

  const response = { booking: mockBooking };
  
  jest.fn().mockResolvedValue(() => Promise.resolve(response));
  
  let spy = jest.spyOn(Admin.prototype, 'getBookings');
  
  shallow<Admin>(<Admin {...props}/>);
  
  expect(spy).toHaveBeenCalledTimes(1);
  
  });

});
  

