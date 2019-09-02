import * as React from "react"; 

export interface IAvailableTablesProp {
	Date: string;
}

class AvailableTables extends React.Component<IAvailableTablesProp, {}> { 
	constructor(props: any) {
		super(props);
	}

	public render() {

		return (
			<div>Tables work
				<p>{this.props.Date}</p>
			</div>
<<<<<<< HEAD
=======
			
>>>>>>> Add props and states that connects Booking, Calendar and AvailableTables components
		); 
	}
}

export default AvailableTables;