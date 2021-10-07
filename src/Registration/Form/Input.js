import React from 'react';

import './Input.css';
import SupervisorSelect from './SupervisorSelect';

const input = (props) => {
  let inputElement = null;

  // label
  const label = <label className="label">{props.label}</label>;

  // input main
  switch (props.elementType) {
    case ('input'):
      inputElement = [
        <div/>,
        label,
        <input
          className="input-element"
          type="input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      ];
      break;
    case ('checkbox'):
      inputElement = [
        <input
          className="checkbox-element"
          type="checkbox"
          value="false"
        />,
        label,
        <input
          className="input-element"
          type="input"
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      ];
      break;
    case ('supervisor'):
      inputElement = [
        <div/>,
        label,
        <SupervisorSelect />
      ];
      break;
    case ('string'):
      inputElement = [
        <p className="string-element">{props.label}</p>
      ];
      break;
    default:
      break;
  }

  // validation error message
  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = 
      <p className="validation-error">
        {props.validation ? props.validation.errorMsg ? props.validation.errorMsg : '' : ''}
      </p>;
  }

  return (
    <>
      <div className="container">
        {inputElement}
      </div>
      {validationError}
    </>
  );
};


export default input;