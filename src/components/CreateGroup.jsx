/* eslint-disable semi */
/* eslint-disable max-len */
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import MultiSelect from 'react-multi-select-component';



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


export default function CreateGroup() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const onSubmit = async data => {
    data.TeacherList = teachers;
    data.StudentList = students;
    console.log(JSON.stringify(data));
    alert(JSON.stringify(data));
  };
  const people = [
    { label: 'Jan Kowalski', value: '1233422424244' },
    { label: 'Jan Nowak', value: '23232323232332' },
    { label: 'Jan Kowalski', value: '12334224224244' },
    { label: 'Jan Kowalski', value: '12334224424244' },
    { label: 'Jan Kowalski', value: '12334224524244' }

  ];
  
  return (
    <FormGroup>
        <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register('DanceType', { required: true })}>
            <Option value="Salsa">Salsa</Option>
            <Option value="Tango">Tango</Option>
            <Option value="Idk">Idk</Option>
            <Option value="cosJeszcze">cosJeszcze</Option>
        </select>
        <select {...register('AdvanceLevel', { required: true })}>
            <Option value="poczatkujacy">poczatkujacy</Option>
            <Option value="sr Zaawansowny">sr Zaawansowny</Option>
            <Option value=" zaawansownay"> zaawansownay</Option>
        </select>
        <Input type="number" placeholder="MaxAmount" {...register('MaxAmount', {required: true, min: 0})} />
        <Input type="datetime-local" placeholder="Scheudle" {...register} />
        <div>
          <h4>Dodaj Nauczycieli</h4>
          <pre>{JSON.stringify(teachers)}</pre>
          <MultiSelect
            options={people}
            value={teachers}
            onChange={setTeachers}
            labelledBy="Select"
          />
        </div>
        <div>
          <h4>Dodaj Studentów</h4>
          <pre>{JSON.stringify(students)}</pre>
          <MultiSelect
            options={people}
            value={students}
            onChange={setStudents}
            labelledBy="Select"
          />
        </div>
        <Input type="submit" />
        
        </form>
        
    </FormGroup>
  )
}