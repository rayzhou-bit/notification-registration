import React, { useEffect } from 'react';

import './Registration.css';

const Registration = props => {

	// GET/api/supervisors 
	useEffect(() => {

	});

	// POST /api/submit

	const submitHandler = (event) => {
		event.preventDefault();
	};

	const select = (
		<select>
			<option>Select...</option>
			<option>apple</option>
		</select>
	);

	return (
		<form onSubmit={submitHandler}>
			<div className="title">
				Notifcation Form
			</div>

			{/* names */}
			<div className="names row">
				<div className="fname">
					<label>First Name</label>
					<input />
				</div>
				<div className="lname">
					<label>Last Name</label>
					<input />
				</div>
			</div>
			
			{/* notification method */}
			<div className="notif-q row">
				<p>How would you prefer to be notified?</p>
			</div>
			<div className="notif-a row">
				<div className="email">
					<input type="checkbox" id="email" />
					<label for="email">Email</label>
					<input />
				</div>
				<div className="phone">
				<input type="checkbox" id="phone" />
					<label for="phone">Phone Number</label>
					<input />
				</div>
			</div>

			{/* supervisor */}
			<div className="supervisor row">
				<label>Supervisor</label>
				{select}
			</div>

			{/* form submit */}
			<div className="submit row">
				<button type="submit">Submit</button>
			</div>
		</form>
	);
};

export default Registration;