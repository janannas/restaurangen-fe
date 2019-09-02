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
			
		); 
	}
}

export default AvailableTables;