/* eslint-disable max-len */
import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import axios from 'axios'
import swal from 'sweetalert'
import Radio from '@material-ui/core/Radio'
import { makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { InputLabel } from '@material-ui/core'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { API_URL } from '../config/server.config'


const InputM = styled(TextField)`
	margin-bottom: 1.5em;
`
const SelectM = styled(Select)`
    margin-bottom: 1.5em;   
`
const RadioM = styled(RadioGroup)`
    margin-bottom: 1.5em;   
    margin: auto;
`
const H1 = styled.h1` 
    text-align:center;
    margin-bottom: 1.5em; 
`
const FormControlM = styled(FormControl)` 
    width:50%;
    margin:auto;
    
`
const Btn = styled(Button)` 
    width:50%;
    margin:auto;
    
`
const Form = styled.form`
    text-align: center;
    
`



export default function CreatePass() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async data => {
    await axios.post(`${API_URL}/passes`,
    data,
    { withCredentials: true }
    )
    swal({
      title: 'Good job!',
      text: 'Stworzyłeś Karnet!',
      icon: 'success',
      button: 'OK!',
    })
  }
  
  return (
  <Form onSubmit={handleSubmit(onSubmit)}>
    <FormControlM>
        <H1>Stwórz Karnet</H1>
        
        <InputM variant="outlined" type="text" placeholder="UserID" {...register('user', {required: true})} />
        <InputM variant="outlined" type="text" placeholder="GroupID" {...register('group')} />
        <SelectM {...register('type', { required: true })}>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="WCS">WCS</MenuItem>
            <MenuItem value="Salsa">Salsa</MenuItem>
        </SelectM>
        <InputM variant="outlined" type="date" placeholder="StartDate" {...register('startDate', {required: true})} />
        <InputM variant="outlined" type="date" placeholder="EndDate" {...register('endDate', {required: true})} />
        <InputM variant="outlined" type="number" placeholder="Price" {...register('price', {required: true, min: 0})} />
        <InputM variant="outlined" type="number" placeholder="RemainingNumber" {...register('remainingNumber', {required: true,min: 0})} />
        
        <Btn type="submit" variant="contained" color="primary">Submit</Btn>
        
    </FormControlM>
  </Form>
  )
}