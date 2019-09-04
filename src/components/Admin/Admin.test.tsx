import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './Admin';
import { unmountComponentAtNode } from "react-dom";
import { shallow } from 'enzyme';
import '../../setupTests';

//Jest testing
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Admin />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//Enzyme testing
describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
     shallow(<Admin />);
   });
});

test('should fetch mockBooking', () => {

  const mockBooking = [{
    "booking_ID": "10",
    "customer_ID": "111",
    "guests": "6",
    "sitting": "2019-10-28 18:00:00",
    "name": "Fanny-Manny",
    "email": "fanny-manny@me.com",
    "phone": "070123456"
  }];
  const response = { booking: mockBooking };

  jest.fn().mockResolvedValue(() => Promise.resolve(response));

  let props = {};
  let spy = jest.spyOn(Admin.prototype, 'getBookings');
  
  shallow<Admin>(<Admin {...props} />);

  expect(spy).toHaveBeenCalledTimes(1);

});

// it('should check `deleteBookingWithID()`', () => {
//   let props = {};
//   let wrapper = shallow<Admin>(<Admin {...props} />);
//   const instance = wrapper.instance(); // you assign your instance of the wrapper
//   jest.spyOn(instance, 'deleteBooking'); // You spy on the randomFunction
//   instance.deleteBookingWithID();
//   expect(instance.deleteBookingWithID).toHaveBeenCalledTimes(1); // You check if the condition you want to match is correct.
// });

// it('should remove an item', () => {
//   const app = shallow<Admin>(<Admin />);

//   const mockBookingToDelete= [{
//     "booking_ID": "10",
//     "customer_ID": "111",
//     "guests": "6",
//     "sitting": "2019-10-28 18:00:00",
//     "name": "Fanny-Manny",
//     "email": "fanny-manny@me.com",
//     "phone": "070123456"
//   }];

//   // expect(app.instance().state.bookingInfo.length).toBe(0);

//   // app.instance().addTodo(mockItem);
//   // app.instance().addTodo(mockItem2);

//   expect(app.instance().state.bookingInfo.length).toBe(1);
//   expect(app.instance().state.bookingInfo[0]).toBe(mockBookingToDelete);
  

//   app.instance().deleteBookingWithID(10);

//   expect(app.instance().state.bookingInfo.length).toBe(0);
//   expect(app.instance().state.bookingInfo[0]).toBe(mockBookingToDelete);

// });

// const mockFunction = jest.fn();

// it('should call mockFunction on button click', () => {
//   let props = {};
//   const wrapper = mount(<Admin {...props} />);
//   // unit testing
//   // wrapper.instance().deleteBookingWithID(10);

//   // e2e testing
//   let spy = spyOn(Admin.prototype, 'deleteBookingWithID');
//   let button = wrapper.find('button#delete-button');
//   console.log(button.length);

//   expect(spy).toHaveBeenCalled();
  
//   // wrapper.unmount();
// });

// describe('Test delete booking function', () => {
//   it('calls click event', () => {

//     const mockDelete = jest.spyOn(Admin.prototype, 'deleteMethod');
//     const component = shallow((<Admin />));
//     component.find('#delete-button').at(1).simulate('click');
//     component.update();
//     expect(mockDelete).toHaveBeenCalled();
//   });
// });
