import React from 'react';
import { shallow, mount } from 'enzyme';
import AvailableTables from './AvailableTables';

describe('AvailableTables Component', () => {
	let props: any = {};
  let AvailableTablesInstance: any;

  beforeEach(() => {
    AvailableTablesInstance = mount<AvailableTables>(
      <AvailableTables {...props} />
    );
  });

  afterEach(() => {
    AvailableTablesInstance.unmount();
	});
	
	it('contains a date', () => {
    // const test = shallow(<AvailableTables
		// 	dateTime={this.state.dateTime}
		// 	config={this.state.config}
		// 	handleTimeClick={this.calculateFreeSeats}
		// 	handleSeatsClick={this.handleSeatsClick}
		// 	freeSeats={this.state.freeSeats}
		// />);
    // expect(test.containsMatchingElement(<h1>Booking works</h1>)).toEqual(true);
  });


});