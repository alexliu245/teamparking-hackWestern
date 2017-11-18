export const sensors = [];

export function addSensor(array) {
	for (let i = 0; i < array.length; i++) {
		var owner = array[i] === undefined ? null : array[i]["owner"];
		var address = array[i] === undefined ? null : array[i]["address"];
		var hourlyRental = array[i] === undefined ? null : array[i]["hourly_rental"];
		var location = array[i] === undefined ? null : array[i]["location"];
		if (location !== null) {
			var type = location["type"];
			var coordinates = location["coordinates"];
		} else {
			var type = null;
			var coordinates = [];
		}
	}

	sensors.push({
		owner: owner,
		address: address,
		hourlyRental: hourlyRental,
		location: {
			type: type,
			coordinates: coordinates
		}
	})
}
