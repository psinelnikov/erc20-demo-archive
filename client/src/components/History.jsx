import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';

export default function History({ contract }) {
	const [events, setEvents] = React.useState([]);

	useEffect(() => {
		window.onbeforeunload = function () {
			localStorage.removeItem('events');
			return true;
		};

		const fetchData = async () => {
			if (contract) {
				const events = await contract.getPastEvents('allEvents', {
					fromBlock: 0,
				});

				window.localStorage.setItem('events', JSON.stringify(events));

				setEvents(events);
			}
		};

		let events = window.localStorage.getItem('events');
		if (events) {
			events = JSON.parse(events);
			setEvents(events);
		} else {
			fetchData();
		}

		return () => {
			window.onbeforeunload = null;
		};
	}, [contract]);

	return (
		<Row className="mt-4">
			<h1>History</h1>
			<div>
				<ul>
					{(events || []).map((event) => (
						<li key={event.id}>
							{event.event} from{' '}
							{event.returnValues.from ||
								event.returnValues.owner}{' '}
							to{' '}
							{event.returnValues.to ||
								event.returnValues.spender}
							, Value: {event.returnValues.value}
						</li>
					))}
				</ul>
			</div>
		</Row>
	);
}
