/* eslint-disable max-len */
/* eslint-disable semi */

import React, {useRef} from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import axios from 'axios';
import swal from 'sweetalert'
import Radio from '@material-ui/core/Radio';
import { makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { InputLabel } from '@material-ui/core'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

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
const RegisterUser = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async data => {
        console.log({data})
        await axios.post('https://dance-school-management-system.herokuapp.com/users',
            data
        )
        swal({
          title: 'Good job!',
          text: `stworzyłeś użytkownika ${data.name}!`,
          icon: 'success',
          button: 'Ok!',
        });
    };

    return (
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <H1>Register</H1>
                <FormControlM variant="outlined">
                    <InputM variant="outlined" type="text" placeholder="First name" {...register('name', {required: true, maxLength: 80})} />
                    {errors.FirstName && <span>First Name is required</span>}
                    <InputM variant="outlined" type="text" placeholder="Last name" {...register('surname', {required: true, maxLength: 100})} />
                    {errors.LastName && <span>Last Name is required</span>}
                    <InputM variant="outlined" type="text" placeholder="Email" {...register('mail', {required: true, pattern: /^\S+@\S+$/i})} />
                    {errors.Email && <span>Correct Email is required</span>}
                    <InputM variant="outlined" type="tel" placeholder="Mobile number" {...register('phoneNumber', {
                        required: true,
                        minLength: 6,
                        maxLength: 12
                    })} />
                    {errors.MobileNumber && <span>Mobile Number is required</span>}
                    <InputM variant="outlined" type="password" placeholder="Password" {...register('password', {
                        required: true,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
                    })} />
                    {errors.Password &&
                    <span>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:</span>}
                    
                    <SelectM {...register('role', {required: true})} >
                    
                        <MenuItem selected value={'student'}>Student</MenuItem>
                   
                        <MenuItem value={'teacher'}>Teacher</MenuItem>
                    
                    </SelectM>
                    <RadioM row>
                        <FormControlLabel
                        value="male"
                        control={<Radio color="primary" />}
                        label="Male"
                        labelPlacement="top"
                        {...register('gender', {required: true})}
                        />
                        <FormControlLabel
                        value="female"
                        control={<Radio color="primary" />}
                        label="Female"
                        labelPlacement="top"
                        {...register('gender', {required: true})}
                        />
                    </RadioM>
                    <Btn type="submit" variant="contained" color="primary">Submit</Btn>
                </FormControlM>
            </Form>
       
    );
}
export default RegisterUser