import React from 'react';
import ReactDOM from 'react-dom';

import '../index.js';

class Owner extends React.Component {
	render() {
		return (
			<div>
				<h2> Owner </h2>
			</div>
		);
	}
}

ReactDOM.render(
	<Owner />,
	document.getElementById("root")
);

export default Owner;
