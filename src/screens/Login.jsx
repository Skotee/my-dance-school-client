import React, { useState } from 'react'
import { Grid, InputAdornment, TextField } from '@material-ui/core'
import { AccountCircle, LockRounded } from '@material-ui/icons'
import styled, { keyframes } from 'styled-components'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const URL_AUTH_LOGIN = 'http://localhost:3000/auth/login'

const moveInLeft = keyframes`
  0% {
    background-position:0% 7%;
  }
  50% {
    background-position:100% 94%;
  }
  100% {
    background-position:0% 20%;
  }
`

const StyledGrid = styled(Grid)`
  background: linear-gradient(270deg, #fbfac7, #bbb3d3, #dddd);
  background-size: 400% 400%;
  height: 100vh;
  animation: ${moveInLeft} 15s ease-in infinite;
`

const FormGroup = styled.div`
	color: palevioletred;
  display: block;
  font-size:1.8rem;
	width: 300px;
	margin: 50px auto;
`

const StyledTextField = styled(TextField)`
	padding: 0.5em;
	border: none;
	border-radius: 3px;
	width: 100%;
	margin-bottom: 0.5em;
`

const Input = styled.input`
	padding: 0.5em;
	color: palevioletred;
	border: none;
	border-radius: 3px;
	width: 100%;
	margin-bottom: 0.5em;
`

const Login = ({
    setUserData
  }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const login = async (data) => {
    axios.post(
      URL_AUTH_LOGIN, data,
    {
      withCredentials: true 
    })
    .then((response) => {
      setUserData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  const onSubmit = async data => {
    login(data)
  }

  return (
    <StyledGrid 
      container
      justify="center"
      alignItems="center"
    >
      <FormGroup>
        <h1>Zaloguj się</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
            type="email"
            label="e-mail"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            {...register('mail', {required: true, pattern: /^\S+@\S+$/i})} 
        />
        {errors.Email && <span>Wymagany jest prawidłowy format adresu e-mail</span>}

        <StyledTextField 
          type="password"
          label="Hasło"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockRounded />
              </InputAdornment>
            ),
          }}
          {...register('password',  {required: true})} 
        />
          {errors.Password && <span>Hasło jest wymagane</span>}
          <Input type="submit" />
        </form>
      </FormGroup>
    </StyledGrid>
  )
}

export default Login
