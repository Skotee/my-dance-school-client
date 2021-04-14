/* eslint-disable max-len */
/* eslint-disable semi */

import React, {useRef}from 'react'
import { useForm} from 'react-hook-form'
import styled from 'styled-components'
import swal from 'sweetalert'

const FormGroup = styled.div`
	color: palevioletred;
    display: block;
  font-size:1.8rem;
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

const Select = styled.select`
	margin-bottom: 0.5em; 
  margin: auto;
	color: palevioletred;
    display: block;
`;
const Option = styled.option`
  
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
        {errors.FirstName && <span>First Name is required</span>}
        <Input type="text" placeholder="Last name" {...register('LastName', {required: true, maxLength: 100})} />
        {errors.LastName && <span>Last Name is required</span>}
        <Input type="text" placeholder="Email" {...register('Email', {required: true, pattern: /^\S+@\S+$/i})} />
        {errors.Email && <span>Correct Email is required</span>}
        <Input type="tel" placeholder="Mobile number" {...register('MobileNumber', {required: true, minLength: 6, maxLength: 12})} />
        {errors.MobileNumber && <span>Mobile Number is required</span>}
        <Input type="password" placeholder="Password" {...register('Password', {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i})} />
        {errors.Password && <span>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:</span>}
        <RadioButtons>
          <Label>Male</Label>ssssss
          <Radio {...register('GenderRadio', { required: true })}type="radio" value="Male" />
          <Label>Female</Label>
          <Radio {...register('GenderRadio', { required: true })}type="radio" value="Female" />
          {/*<Label>Other</Label>
          <Radio {...register('GenderRadio', { required: true })}type="radio" value="Other" />*/}
        </RadioButtons>
        <Select {...register('Role', { required: true })}>
        <Option value="Student">Student</Option>
        <Option value="Teacher">Teacher</Option>
        </Select>
        <Input type="submit" />
      </form>
    </FormGroup>
  );
}

export default RegisterUser