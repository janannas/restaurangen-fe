import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Admin from './Admin';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import mockAxios from "axios";

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

// it("fetch mock booking data", async () => {
//   // setup
//   mockAxios.get.mockImplementationOnce(() =>
//     Promise.resolve({
//       fakeBooking: { results: [
//         {
//         "booking_ID": "10",
//         "customer_ID": "111",
//         "guests": "6",
//         "sitting": "2019-10-28 18:00:00",
//         "name": "Fanny-Manny",
//         "email": "fanny-manny@me.com",
//         "phone": "070123456"
//         }
//       ]}
//     })
//   );

//   const textContent = await fetch("bookings");

//   // expect
//   expect(textContent).toEqual(.name);
//   expect(mockAxios.get).toHaveBeenCalledTimes(1);
//   expect(mockAxios.get).toHaveBeenCalledWith(
//     "fakeBooking",
//     {
//       params: {
//         client_id: process.env.REACT_APP_UNSPLASH_TOKEN,
//         query: "bookings"
//       }
//     }
//   );
// });

it("renders booking data", async () => {
  // let wrapper = shallow(<Admin />);
  // wrapper.instance()

  const fakeBooking = {
    "booking_ID": "10",
    "customer_ID": "111",
    "guests": "6",
    "sitting": "2019-10-28 18:00:00",
    "name": "Fanny-Manny",
    "email": "fanny-manny@me.com",
    "phone": "070123456"
  };

  jest.spyOn(global, "axios.get").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeBooking)
    })
  );

// Use the asynchronous version of act to apply resolved promises
await act(async () => {
  render(<Admin />, container);
});

expect(container.querySelector("td").textContent).toBe(fakeBooking.booking_ID);
expect(container.querySelector("td").textContent).toBe(fakeBooking.customer_ID);
expect(container.querySelector("td").textContent).toBe(fakeBooking.guests);
expect(container.querySelector("td").textContent).toBe(fakeBooking.sitting);
expect(container.querySelector("td").textContent).toBe(fakeBooking.name);
expect(container.querySelector("td").textContent).toBe(fakeBooking.email);
expect(container.querySelector("td").textContent).toBe(fakeBooking.phone);

//expect(container.textContent).toContain(fakeBooking.address);

// remove the mock to ensure tests are completely isolated
global.axios.get.mockRestore();
});
