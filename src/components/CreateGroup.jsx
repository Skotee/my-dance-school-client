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

export default function CreateGroup() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = data => console.log(data)
  console.log(errors)
  
  return (
    <FormGroup>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="GroupName" {...register} />
        <Select {...register('DanceType', { required: true })}>
            <Option value="Salsa">Salsa</Option>
            <Option value="Tango">Tango</Option>
            <Option value="Idk">Idk</Option>
            <Option value="cosJeszcze">cosJeszcze</Option>
        </Select>
        <Select {...register('AdvanceLevel', { required: true })}>
            <Option value="poczatkujacy">poczatkujacy</Option>
            <Option value="sr Zaawansowny">sr Zaawansowny</Option>
            <Option value=" zaawansownay"> zaawansownay</Option>
        </Select>
        <Input type="number" placeholder="MaxAmount" {...register('MaxAmount', {required: true, min: 0})} />
        <Input type="datetime-local" placeholder="Scheudle" {...register} />

        <Input type="submit" />
        </form>
    </FormGroup>
  )
}