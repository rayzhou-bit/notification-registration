import React, { useState } from 'react';
import axios from 'axios';

import './Registration.css';
import useHttp from '../hooks/http';
import SupervisorSelect from './Form/SupervisorSelect';

const Registration = props => {
	const [formData, setFormData] = useState({
		fname: '',
		lname: '',
		emailCheck: false,
		email: '',
		phoneCheck: false,
		phone: '',
		supervisor: '',
	});
	const [validationErr, setValidationErr] = useState([]);
	
	const { sendRequest } = useHttp();

	// POST /api/submit
	const submitHandler = (event) => {
		event.preventDefault();

		// Validation check
		let validationErr = [];
		if (!checkValidity(formData.fname, "isAlpha")) {
			validationErr.push("Please enter a first name containing only letters.");
		}
		if (!checkValidity(formData.lname, "isAlpha")) {
			validationErr.push("Please enter a last name containing only letters.");
		}
		if (!formData.emailCheck && !formData.phoneCheck) {
			validationErr.push("Please provide an email and/or a phone number.");
		}
		if (formData.emailCheck && !checkValidity(formData.email, "isEmail")) {
			validationErr.push("Please enter a valid email address.");
		}
		if (formData.phoneCheck && !checkValidity(formData.phone, "isPhone")) {
			validationErr.push("Please enter a valid email address.");
		}
		setValidationErr(validationErr);
		console.log(validationErr.length > 0)

		// POST /api/submit
		if (validationErr.length === 0) {
			sendRequest(
				'/api/submit',
				'POST',
				JSON.stringify(formData),
			);
		}
	};

	// Validation Error Display
	let validationElement = [];
	for (let key in validationErr) {
		validationElement.push(
			<p key={key} className="err">{validationErr[key]}</p>
		);
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="title">Notification Form</div>

			{/* First and Last Names */}
			<div className="names">
				<div className="first name">
					<label>First Name</label>
					<input type="text" required
						value={formData.fname}
						onChange={e => setFormData(updateObject(formData, {fname: e.target.value}))}
					/>
				</div>
				<div className="last name">
					<label>Last Name</label>
					<input type="text" required 
						value={formData.lname}
						onChange={e => setFormData(updateObject(formData, {lname: e.target.value}))}
					/>
				</div>
			</div>

			{/* Notify methods */}
			<p className="notify-q">How would you prefer to be notified?</p>
			<div className="notify">
				<div className="email">
					<div>
						<input type="checkbox"
							value={formData.emailCheck}
							onChange={e => setFormData(updateObject(formData, {emailCheck: e.target.value}))}
						/>
						<label>Email</label>
					</div>
					<input type="text" 
						value={formData.email}
						onChange={e => setFormData(updateObject(formData, {email: e.target.value}))}
					/>
				</div>
				<div className="phone">
					<div>
						<input type="checkbox" 
							value={formData.phoneCheck}
							onChange={e => setFormData(updateObject(formData, {phoneCheck: e.target.value}))}
						/>
						<label>Phone Number</label>
					</div>
					<input type="text" 
						value={formData.phone}
						onChange={e => setFormData(updateObject(formData, {phone: e.target.value}))}
					/>
				</div>
			</div>

			{/* Supervisor select */}
			<div className="supervisor">
				<label>Supervisor</label>
				<SupervisorSelect 
					value={formData.supervisor}
					onChange={e => setFormData(updateObject(formData, {supervisor: e.target.value}))}
				/>
			</div>

			{/* Validation errors */}
			<div className="validation">
				{validationElement}
			</div>

			{/* Submit form */}
			<div className="submit">
				<button>SUBMIT</button>
			</div>

		</form>
	);
};

// Validity checks.
//   isAlpha checks for alphabetical only string (no numbers)
//	 isEmail checks for email string
//   isPhone checks for phone number
const checkValidity = (value, rules) => {
	let isValid = true;
	if (!rules) { return true }
	if (rules === 'isAlpha') {
		const pattern = /^[A-Za-z]+$/;
			isValid = pattern.test(value) && isValid;
	}
	if (rules === 'isEmail') {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(value) && isValid;
	}
	if (rules === 'isPhone') {
		const pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
		isValid = pattern.test(value) && isValid;
	}
	return isValid;
};

const updateObject = (oldObject,updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export default Registration;