import React, { useState } from 'react';

import './Registration.css';
import Input from './Form/Input';
import Button from './Form/Button';

const Registration = props => {
	// Form. This state represents the entire form.
	//   label: string value for label
	//   elementType: string choice of input, checkbox, supervisor, or string; see ./Form/Input.js for more info
	//   elementConfig: html configurations for text input
	//	 value: initial string value for inputs
	//   validation: holds settings for what to validate and the error message to display
	//	 valid: boolean value for if field is valid
	//	 touched: boolean value for if user has interacted with field
	const [form, setForm] = useState({
		fname: {
			label: 'First Name',
			elementType: 'input',
			elementConfig: {
				placeholder: 'First Name',
			},
			value: '',
			validation: {
				required: true,
				isAlpha: true,
				errorMsg: 'Please enter a name using only letters.',
			},
			valid: false,
			touched: false,
		},
		lname: {
			label: 'Last Name',
			elementType: 'input',
			elementConfig: {
				placeholder: 'Last Name',
			},
			value: '',
			validation: {
				required: true,
				isAlpha: true,
				errorMsg: 'Please enter a name using only letters.',
			},
			valid: false,
			touched: false,
		},
		notificationStr: {
			label: 'How would you prefer to be notified?',
			elementType: 'string',
			validation: {},
			valid: true,
			touched: true,
		},
		email: {
			label: 'Email',
			elementType: 'checkbox',
			elementConfig: {
				placeholder: 'Email',
			},
			value: '',
			validation: {
				required: false,
				isEmail: true,
				errorMsg: 'Please enter a valid email address.',
			},
			valid: false,
			touched: false,
		},
		phone: {
			label: 'Phone Number',
			elementType: 'checkbox',
			elementConfig: {
				placeholder: 'Phone Number',
			},
			value: '',
			validation: {
				required: false,
				isPhone: true,
				errorMsg: 'Please enter a valid phone number.',
			},
			valid: false,
			touched: false,
		},
		gap: {
		},
		supervisor: {
			label: 'Supervisor',
			elementType: 'supervisor', 
			elementConfig: {
				options: [],
			},
			value: '',
			valid: true,
			touched: false,
		},
	});
	const [formIsValid, setFormIsValid] = useState(false);

	// Validity checks.
	//   isAlpha checks for alphabetical only string (no numbers)
	//	 isEmail checks for email string
	//   isPhone checks for phone number
	const checkValidity = (value, rules) => {
		let isValid = true;
		if (!rules) { return true }
		if (rules.required) { 
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.isAlpha) {
			const pattern = /^[A-Za-z]+$/;
    		isValid = pattern.test(value) && isValid;
		}
		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}
		if (rules.isPhone) {
			const pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
			isValid = pattern.test(value) && isValid;
		}
		return isValid;
	};

	// Function called when user updates input.
	const inputChangedHandler = (event, inputId) => {
		const updatedFormElement = {
			...form[inputId],
			value: event.target.value,
			valid: checkValidity(event.target.value, form[inputId].validation),
			touched: true,
		};
		const updatedForm = {
			...form,
			[inputId]: updatedFormElement,
		};

		let formIsValid = true;
		for (let inputId in updatedForm) {
			formIsValid = updatedForm[inputId].valid && formIsValid;
		}
		setForm(updatedForm);
		setFormIsValid(formIsValid);
	};

	// POST /api/submit
	const formSubmitHandler = (event) => {
		event.preventDefault();
	};

	// setup form object
	const formElementsArray = [];
	for (let key in form) {
		formElementsArray.push({
			id: key,
			config: form[key],
		});
	}
	let formObj = (
		<form onSubmit={formSubmitHandler}>
			{formElementsArray.map(formElement => (
				<Input
					key={formElement.id}
					label={formElement.config.label}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.value}
					invalid={!formElement.config.valid}
					validation={formElement.config.validation ? formElement.config.validation : false}
					touched={formElement.config.touched}
					changed={(e) => inputChangedHandler(e, formElement.id)}
				/>
			))}
			<Button btnType="success" disabled={!formIsValid}>SUBMIT</Button>
		</form>
	);

	return (
		<div>
			<div className="title">Notification Form</div>
			{formObj}
		</div>
	);
};

export default Registration;