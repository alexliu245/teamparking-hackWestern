import React from 'react';
import ReactDOM from 'react-dom';

import '../index.js';

class Client extends React.Component {
    render() {
        return (
            <div>
                <h2> Client </h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Client />,
    document.getElementById("root")
);  

export default Client;
