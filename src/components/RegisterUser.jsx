/* eslint-disable max-len */
/* eslint-disable semi */

import React, {useRef}from 'react'
import { useForm} from 'react-hook-form'
import styled from 'styled-components'

const FormGroup = styled.div`
	color: palevioletred;
    display: block;
	width: 300px;
	margin: 50px auto;
`;

const Label = styled.label`
	margin-bottom: 0.5em;
	color: palevioletred;
    display: block;
`;


const Input = styled.input`
	padding: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
	width: 100%;
	margin-bottom: 0.5em;
`;

const Message = styled.label`
	margin-bottom: 0.5em;
	color: palevioletred;
    display: block;
`;
const Radio = styled.input`
	margin-bottom: 0.5em;
	color: palevioletred;
  display: inline;
`;
const RadioButtons = styled.div`
  display:flex;
  justify-content:space-between;
`;
const RegisterUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async data => {
    alert(JSON.stringify(data));
  };
  
  return (
    <FormGroup className="">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="First name" {...register('FirstName', {required: true, maxLength: 80})} />
        <Input type="text" placeholder="Last name" {...register('LastName', {required: true, maxLength: 100})} />
        <Input type="text" placeholder="Email" {...register('Email', {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.Email && <span>Check if your email is correct!</span>}
        <Input type="tel" placeholder="Mobile number" {...register('Mobile number', {required: true, minLength: 6, maxLength: 12})} />
        
        <Input type="password" placeholder="Password" {...register('Password', {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i})} />
        {errors.Password && <span>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:</span>}
        <RadioButtons>
          <Label>Male</Label>
          <Radio {...register('GenderRadio', { required: true })}type="radio" value="Male" />
          <Label>Female</Label>
          <Radio {...register('GenderRadio', { required: true })}type="radio" value="Female" />
          <Label>Other</Label>
          <Radio {...register('GenderRadio', { required: true })}type="radio" value="Other" />
        </RadioButtons>
        <select {...register('Role', { required: true })}>
        <option value="Student">Student</option>
        <option value="Teacher">Teacher</option>
        </select>
        <Input type="submit" />
      </form>
    </FormGroup>
  );
}

export default RegisterUser