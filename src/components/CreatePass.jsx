/* eslint-disable max-len */
import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import axios from 'axios'

const FormGroup = styled.div`
	color: palevioletred;
  display: block;
  font-size:1.3rem;
	width: 300px;
	margin: 50px auto;
`

const Label = styled.label`
	margin-bottom: 0.5em;
	color: palevioletred;
  display: block;
`


const Input = styled.input`
	padding: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
	width: 100%;
	margin-bottom: 0.5em;
`

const Select = styled.select`
	margin-bottom: 0.5em; 
  margin: auto;
	color: palevioletred;
  display: block;
`
const Option = styled.option`
  
`
const Radio = styled.input`
	margin-bottom: 0.5em;
	color: palevioletred;
  display: inline;
`
const RadioButtons = styled.div`
  display:flex;
  justify-content:space-between;
`



export default function CreatePass() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async data => {
    //'http://localhost:3000/passes'
    await axios.post('https://dance-school-management-system.herokuapp.com/passes',
    data
    )
    alert('utworzono karnet')
  }
  
  return (
    <FormGroup>
        <h1>Stwórz Karnet</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="UserID" {...register('user', {required: true})} />
        <Input type="text" placeholder="GroupID" {...register('group')} />
        <Select {...register('type', { required: true })}>
            <Option value="Open">Open</Option>
            <Option value="WCS">WCS</Option>
            <Option value="Salsa">Salsa</Option>
        </Select>
        <Input type="date" placeholder="StartDate" {...register('startDate', {required: true})} />
        <Input type="date" placeholder="EndDate" {...register('endDate', {required: true})} />
        <Input type="number" placeholder="Price" {...register('price', {required: true, min: 0})} />
        <Input type="number" placeholder="RemainingNumber" {...register('remainingNumber', {required: true,min: 0})} />
        
        <Input type="submit" />
        </form>
    </FormGroup>
  )
}