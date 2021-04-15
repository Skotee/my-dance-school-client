/* eslint-disable semi */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import MultiSelect from 'react-multi-select-component';
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
import { API_URL } from '../config/server.config';


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
    margin-top: 1.6em;
    
`
const Form = styled.form`
    text-align: center;
    
`

const createOption = person => {
  return {
    label: `${person.name} ${person.surname}`,
    value: person._id
  }
}

export default function CreateGroup() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [teachersState, setTeachers] = useState([]);
  const [studentsState, setStudents] = useState([]);
  const [teachersOptions, setTeachersOptions] = useState([]);
  const [studentsOptions, setStudentsOptions] = useState([]);
  const onSubmit = async data => {
    data.teachers = teachersState.map(p =>p.value);
    data.students = studentsState.map(p =>p.value);
    
  
    axios.post(`${API_URL}/groups`,
      data,
      { withCredentials: true }
    )
    swal({
      title: 'Good job!',
      text: 'Stworzyłeś Nową Grupę!',
      icon: 'success',
      button: 'Aww yiss!',
    });
  };
  useEffect(() => {
    const getPeople = axios.get(`${API_URL}users`, { withCredentials: true }).then(function (response){
      console.log(response.data)
      const teachers = response.data.filter(person=>person.role.includes('teacher')).map(createOption)
      const students = response.data.filter(person=>person.role.includes('student')).map(createOption)
      setTeachersOptions(teachers);
      setStudentsOptions(students);
     
    })
  }, [])
  

  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
    <FormControlM>
        <H1>Utwórz Grupę</H1>
        
        <SelectM variant="outlined" {...register('danceType', { required: true })}>
            <MenuItem value="salsa">Salsa</MenuItem>
            <MenuItem value="tango">Tango</MenuItem>
            <MenuItem value="westcoastswing ">WestCoastSwing </MenuItem>
            <MenuItem value="zouk">Zouk</MenuItem>
            <MenuItem value="discofox">Discofox</MenuItem>
        </SelectM>
        <SelectM variant="outlined" {...register('advanceLevel', { required: true })}>
            <MenuItem value="p1a">p1a</MenuItem>
            <MenuItem value="p1b">p1b</MenuItem>
            <MenuItem value="p1c">p1c</MenuItem>
            <MenuItem value="p2a">p2a</MenuItem>
            <MenuItem value="p2b">p2b</MenuItem>
            <MenuItem value="p2c">p2c</MenuItem>
            <MenuItem value="p2c">p2c</MenuItem>
            <MenuItem value="p3a">p3a</MenuItem>
            <MenuItem value="p3b">p3b</MenuItem>
            <MenuItem value="p3c">p3c</MenuItem>
        </SelectM>
        <InputM variant="outlined" type="number" placeholder="maxAmount" {...register('maxAmount', {required: true, min: 0})} />
        
        <div>
          <h4>Dodaj Nauczycieli</h4>
          <pre>{teachersState.map(p =>`${p.label}, `)}</pre>
          <MultiSelect
            options={teachersOptions}
            value={teachersState}
            onChange={setTeachers}
            labelledBy="Select"
          />
        </div>
        <div>
          <h4>Dodaj Studentów</h4>
          <pre>{studentsState.map(p =>`${p.label}, `)}</pre>
          <MultiSelect
            options={studentsOptions}
            value={studentsState}
            onChange={setStudents}
            labelledBy="Select"
          />
        </div>
        <Btn type="submit" variant="contained" color="primary">Submit</Btn>
        
        
        
    </FormControlM>
    </Form>
  )
}