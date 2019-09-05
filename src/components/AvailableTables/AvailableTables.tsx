import * as React from "react"; 

export interface IAvailableTablesProp {
	date: string;
	config: {
		sittingOne: string;
		sittingTwo: string;
	}
}

class AvailableTables extends React.Component<IAvailableTablesProp, {}> { 
	constructor(props: any) {
		super(props);
	}

	public render() {
		
		var numberOfGuests = (
			<select>
			<option value="volvo">Volvo</option>
			<option value="saab">Saab</option>
			<option value="mercedes">Mercedes</option>
			<option value="audi">Audi</option>
		</select>
		)
		return (
			<div>
				<h3>{this.props.date}</h3>
				<div><h4>{this.props.config.sittingOne}</h4></div>
				<div><h4>{this.props.config.sittingTwo}</h4></div>
				{numberOfGuests}
			</div>
		); 
	}
}

export default AvailableTables;