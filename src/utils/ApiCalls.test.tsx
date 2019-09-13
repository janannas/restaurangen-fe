import axios, { AxiosResponse } from 'axios';
import ApiCalls from './ApiCalls';
 
jest.mock('axios');
 
describe('ToDoList component', () => {
  describe('when rendered', () => {
    it('should fetch a list of tasks', () => {
      const getSpy = jest.spyOn(axios, 'get');
      
      new ApiCalls().getAllBookings();

      expect(getSpy).toBeCalled();
    });

    it('should return mock data', () => {
      const getSpy = jest.spyOn(axios, 'get');
      
      new ApiCalls().getAllBookings()
        .then((result: AxiosResponse) => {
          expect(result.data.length).toBe(1);

          expect(result.data[0].booking_ID).toBe(10);
        });

      expect(getSpy).toBeCalled();
    
    })
  });
});