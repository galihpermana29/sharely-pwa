export function parseStatus(status) {
	switch (status) {
		case 'ongoing':
			return 'On Going';
		case 'waiting for help':
			return 'Helped';

		default:
			return 'unknow status';
	}
}

export function statusColor(status) {
	switch (status) {
		case 'ongoing':
			return 'red';
		case 'waiting for help':
			return 'green';

		default:
			return 'black';
	}
}
