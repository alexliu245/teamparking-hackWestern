import axios from 'axios';

class SensorService {
	sendData(owner) {
		axios.post("http://parkingapp.bsyes82dni.us-east-1.elasticbeanstalk.com/sensor/5a104cbd96bd8a44db6e9255/session/sensor",
		{
			owner: owner
		})
		.then(res => this.setState({ name: res.data }))
		.catch(err => console.log(err))
	}
}

export default SensorService