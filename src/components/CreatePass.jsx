/* eslint-disable max-len */
import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

const FormGroup = styled.div`
	color: palevioletred;
    display: block;
  font-size:1.8rem;
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
    alert(JSON.stringify(data))
    console.log(data)
  }
  
  return (
    <FormGroup>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="UserID" {...register('UserID', {required: true})} />
        <Select {...register('Group', { required: true })}>
            <Option value="Salsa">Salsa</Option>
            <Option value="Tango">Tango</Option>
            <Option value="Idk">Idk</Option>
            <Option value="cosJeszcze">cosJeszcze</Option>
        </Select>
        <Input type="datetime-local" placeholder="StartDate" {...register('StartDate', {required: true})} />
        <Input type="datetime-local" placeholder="EndDate" {...register('EndDate', {required: true})} />
        <Input type="number" placeholder="Price" {...register('Price', {required: true, min: 0})} />
        <Input type="number" placeholder="RemainingNumber" {...register('RemainingNumber', {required: true,min: 0})} />
        
        <Input type="submit" />
        </form>
    </FormGroup>
  )
}