import React, { useEffect, useReducer } from 'react';

import useHttp from '../../hooks/http';

const supervisorReducer = (currSupervisors, action) => {
	switch (action.type) {
		case 'SET':
			return action.supervisors;
		default:
			throw new Error("Invalid case for supervisorReducer.");
	}
};

const SupervisorSelect = props => {
	const { value, onChange } = props;
	const { isLoading, data, error, sendRequest } = useHttp();

	const [supervisors, dispatch] = useReducer(supervisorReducer, []);

	// GET /api/supervisors 
	useEffect(() => {
		const t = setTimeout(() => {
			sendRequest(
				// 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers',		// use this for testing
				'https://localhost:8080/api/supervisors',
				'GET'
			);
		}, 500);
		return () => clearTimeout(t);
	}, [sendRequest]);
	
	// process GET data after loading is finished
	useEffect(() => {
		if (!isLoading && !error && data) {
			const loadedSupervisors = [];
			console.log(data)
			for (const key in data) {
				loadedSupervisors.push({
					id: key,
					jurisdiction: data[key].jurisdiction,
					firstName: data[key].firstName,
					lastName: data[key].lastName,
				});
			}
			dispatch({
				type: 'SET',
				supervisors: loadedSupervisors,
			});
		}
	}, [data, isLoading, error]);

	// Create supervisor list in order of jurisdiction, lastName, firstName.
	// Exclude numeric jurisdictions.
	//   string format:  jurisdiction - lastName, firstName
	let supervisorList = [<option key={0} value=''>Select...</option>];
	for (let i in supervisors) {
		const supervisor = supervisors[i];
		supervisorList = [
			...supervisorList,
			<option 
				key={i+1}
				value={supervisor.jurisdiction + " - " + supervisor.lastName + ", " + supervisor.firstName}
			>
				{supervisor.jurisdiction + " - " + supervisor.lastName + ", " + supervisor.firstName}
			</option>
		];
	}

	return (
		<select className="input-element"
			value={value}
			onChange={onChange}
		>
			{supervisorList}
		</select>
	);
};

export default SupervisorSelect;