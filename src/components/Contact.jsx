import React from 'react'
import { makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { InputLabel } from '@material-ui/core'
import axios from 'axios'
import { API_URL } from '../config/server.config'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50vw',
    }
  },
  button: {
    width: '15vw',
    display: 'block',
    margin: '0 auto', 
    marginTop: '20px',
  }, 
}))

const Contact = () => {
  const classes = useStyles()
  let [choose, setChoose] = React.useState([])

  const selectGroup = (event) => {
    if(event.target.value === 10) {
      showInstructors()
    } else if (event.target.value === 20) {
      showStudents()
    } else if (event.target.value === 30) {
      showGroups()
    }
  }

  const showInstructors = () => {
    axios.get(`${API_URL}/users`, { withCredentials: true })
    .then(response => {
      let users = response.data
      let teachersNames = []
      for(let i = 0; i < users.length; i++) {
        for(let j = 0; j < users[i].role.length; j++) {
          if(users[i].role[j] ==='teacher') {
            teachersNames.push(users[i].name + ' ' + users[i].surname)
          }
        }
      }
      setChoose(teachersNames)
    }).catch(error => {
    console.log('error', error)
    })    
  } 

  const showStudents = () => {
    axios.get(`${API_URL}/users`,  { withCredentials: true })
    .then(response => {
      let users = response.data
      let studentsNames = []
      for(let i = 0; i < users.length; i++) {
        for(let j = 0; j < users[i].role.length; j++) {
          if(users[i].role[j] ==='student') {
            studentsNames.push(users[i].name + ' ' + users[i].surname)
          }
        }
      }
      setChoose(studentsNames)
    }).catch(error => {
    console.log('error', error)
    })   
  } 

  const showGroups = () => {
    axios.get(`${API_URL}/groups`, { withCredentials: true })
    .then(response => {
      let groups = response.data
      let groupsNames = []
      for(let i = 0; i < groups.length; i++) {
        if(groups[i].danceType != undefined && groups[i].advanceLevel != undefined ) {
          groupsNames.push(groups[i].danceType + '-' + 
          groups[i].advanceLevel)
        }   
    }
    
      setChoose(groupsNames)
    }).catch(error => {
    console.log('error', error)
    }) 
  } 

return (
  <div>
    <h1>Kontakt</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Wybierz do kogo chcesz napisa?? wiadomo????</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            onChange={selectGroup}
            label="Wybierz do kogo chcesz napisa?? wiadomo????"
            >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value={10}>Do instruktora </MenuItem>
            <MenuItem value={20}>Do kursanta</MenuItem>
            <MenuItem value={30}>Do wszystkich cz??onk??w danej grupy</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Wybierz nazwisko/grup??</InputLabel>               
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Wybierz do kogo chcesz napisa?? wiadomo????"
            >
            <MenuItem value=""><em>None</em></MenuItem>
              {
                choose.map(s => {
                  return <MenuItem key={s} value={s}> {s} </MenuItem>
                })
              }
          </Select>
        </FormControl> 

        <TextField className={classes.text}
          label="Tre???? wiadomo??ci" 
          variant="outlined" 
          multiline rows={8}
          required>
        </TextField>

        <Button className={classes.button} variant="contained" color="primary">
          Wy??lij
        </Button>
    </form>
  </div>
  )
}

export default Contact