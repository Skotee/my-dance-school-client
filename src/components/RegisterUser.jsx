/* eslint-disable max-len */
/* eslint-disable semi */
import React from 'react'
import { useForm } from 'react-hook-form'
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
  const onSubmit = data => console.log(data)
  
  return (
    <FormGroup className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="First name" {...register('First name', {required: true, maxLength: 80})} />
        <Input type="text" placeholder="Last name" {...register('Last name', {required: true, maxLength: 100})} />
        <Input type="text" placeholder="Email" {...register('Email', {required: true, pattern: /^\S+@\S+$/i})} />
        <Input type="tel" placeholder="Mobile number" {...register('Mobile number', {required: true, minLength: 6, maxLength: 12})} />
        <RadioButtons>
          <Label>Male</Label>
          <Radio {...register('GenderRadio', { required: true })}type="radio" value="Male" />
          <Label>Female</Label>
          <Radio {...register('GenderRadio', { required: true })}type="radio" value="Female" />
          <Label>Other</Label>
          <Radio {...register('GenderRadio', { required: true })}type="radio" value="Other" />
        </RadioButtons>
        <Input type="submit" />
      </form>
    </FormGroup>
  );
}

export default RegisterUser