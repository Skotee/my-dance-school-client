/* eslint-disable semi */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import MultiSelect from 'react-multi-select-component';
import axios from 'axios'


const FormGroup = styled.div`
	color: palevioletred;
    display: block;
  font-size:1.2rem;
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

// const Select = styled.select`
// 	margin-bottom: 0.5em; 
//   margin: auto;
// 	color: palevioletred;
//     display: block;
// `
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
    
    const local = 'http://localhost:3000'
    const heroku = 'https://dance-school-management-system.herokuapp.com'
    axios.post(`${heroku}/groups`,
      data
    )
    alert('grupa została utworzona')
  };
  useEffect(() => {
    const getPeople = axios.get('https://dance-school-management-system.herokuapp.com/users').then(function (response){
      console.log(response.data)
      const teachers = response.data.filter(person=>person.role.includes('teacher')).map(createOption)
      const students = response.data.filter(person=>person.role.includes('student')).map(createOption)
      setTeachersOptions(teachers);
      setStudentsOptions(students);
     
    })
  }, [])
  

  
  return (
    <FormGroup>
        <h1>Utwórz Grupę</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('danceType', { required: true })}>
            <Option value="salsa">Salsa</Option>
            <Option value="tango">Tango</Option>
            <Option value="westcoastswing ">WestCoastSwing </Option>
            <Option value="zouk">Zouk</Option>
            <Option value="discofox">Discofox</Option>
        </select>
        <select {...register('advanceLevel', { required: true })}>
            <Option value="p1a">p1a</Option>
            <Option value="p1b">p1b</Option>
            <Option value="p1c">p1c</Option>
            <Option value="p2a">p2a</Option>
            <Option value="p2b">p2b</Option>
            <Option value="p2c">p2c</Option>
            <Option value="p2c">p2c</Option>
            <Option value="p3a">p3a</Option>
            <Option value="p3b">p3b</Option>
            <Option value="p3c">p3c</Option>
        </select>
        <Input type="number" placeholder="maxAmount" {...register('maxAmount', {required: true, min: 0})} />
        
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
        <Input type="submit" />
        
        </form>
        
    </FormGroup>
  )
}