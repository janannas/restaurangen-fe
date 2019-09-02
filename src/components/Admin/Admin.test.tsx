import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Admin from './Admin';
import { unmountComponentAtNode } from "react-dom";
import mockAxios from 'axios';
import { shallow } from 'enzyme';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Admin />, div);
  ReactDOM.unmountComponentAtNode(div);
});

let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// const { componentDidMount } = require('./Admin');

it('should call componentDidMount', async => {
  // componentDidMount('./Admin', {}).then((response: any) => {
  //   expect(response).toEqual({
  //     data: {},
  //   });
  // });
  // expect(mockAxios.request).toHaveBeenCalledWith({
  //   method: 'get',
  //   url: '/test'
  // });
  // expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // // expect(consoleErrorSpy).not.toHaveBeenCalled();
  // done();
  mockAxios.get.mockImplementationOnce(() => {
    Promise.resolve({
      data: { results: [{
        "booking_ID": "10",
        "customer_ID": "111",
        "guests": "6",
        "sitting": "2019-10-28 18:00:00",
        "name": "Fanny-Manny",
        "email": "fanny-manny@me.com",
        "phone": "070123456"
      }] }
    })
  });

  let wrapper = shallow(<Admin />);
  //spyOn(wrapper.instance(), 'componentDidMount');
  
});


// it('fetches and displays bookings', async () => {
  // const fakeBooking = {
  //   "booking_ID": "10",
  //   "customer_ID": "111",
  //   "guests": "6",
  //   "sitting": "2019-10-28 18:00:00",
  //   "name": "Fanny-Manny",
  //   "email": "fanny-manny@me.com",
  //   "phone": "070123456"
  // }

// });

//   const { componentDidMount } = require('./Admin');

//   it("should render booking data", async () => {
//     componentDidMount().then((data: any) => {
//       expect(data).toEqual({
//         "booking_ID": "10",
//         "customer_ID": "111",
//         "guests": "6",
//         "sitting": "2019-10-28 18:00:00",
//         "name": "Fanny-Manny",
//         "email": "fanny-manny@me.com",
//         "phone": "070123456"
//       });
//     })
//   });
  


// const get = url => {
//   mockAxios.get-mockImplementationOnce(( => 
//     Promise.resolve({
//     fakeBooking: { result: [{
//       "booking_ID": "10",
//       "customer_ID": "111",
//       "guests": "6",
//       "sitting": "2019-10-28 18:00:00",
//       "name": "Fanny-Manny",
//       "email": "fanny-manny@me.com",
//       "phone": "070123456"
//     }]}
//   });
// }

// const { componentDidMount } = require('./Admin');

// it("should render booking data", async () => {
//   componentDidMount().then((data: any) => {
//     expect(data).toEqual({
//       "booking_ID": "10",
//       "customer_ID": "111",
//       "guests": "6",
//       "sitting": "2019-10-28 18:00:00",
//       "name": "Fanny-Manny",
//       "email": "fanny-manny@me.com",
//       "phone": "070123456"
//     });
//   })
// });

//   const fakeBooking = {
//     "booking_ID": "10",
//     "customer_ID": "111",
//     "guests": "6",
//     "sitting": "2019-10-28 18:00:00",
//     "name": "Fanny-Manny",
//     "email": "fanny-manny@me.com",
//     "phone": "070123456"
//   };
