import React from 'react';
import { shallow, mount } from 'enzyme';
import AvailableTables, { IAvailableTablesProps } from './AvailableTables';

describe('AvailableTables Component', () => {
	let props: IAvailableTablesProps;
	let AvailableTablesInstance: any;

	beforeAll(() => {
		props = {
			dateTime: {
				date: '2019-09-10',
				time: '18:00:00'
			},
			config: {
				sittingOne: '18:00:00',
				sittingTwo: '21:00:00'
			},
			freeSeats: 0,
			guests: 0,
			handleTimeClick: jest.fn(),
			handleSeatsClick: jest.fn()
		}
	});

	beforeEach(() => {
		AvailableTablesInstance = mount<AvailableTables>(
			<AvailableTables {...props} />
		);
	});

	afterEach(() => {
		AvailableTablesInstance.unmount();
	});

	it('should render without crashing', () => {
		shallow(<AvailableTables {...props} />);
	});

	it('should contain set date', () => {
		const test = shallow(<AvailableTables {...props} />);
		expect(test.containsMatchingElement(<h3>2019-09-10</h3>)).toEqual(true);
	});
});