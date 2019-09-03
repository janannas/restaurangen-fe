import * as React from "react"; 

export interface IAvailableTablesProp {
	date: string;
}

class AvailableTables extends React.Component<IAvailableTablesProp, {}> { 
	constructor(props: any) {
		super(props);
	}

	public render() {

		return (
			<div>Tables work
				<p>{this.props.date}</p>
			</div>
		); 
	}
}

export default AvailableTables;