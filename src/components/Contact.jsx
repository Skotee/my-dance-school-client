import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { InputLabel } from '@material-ui/core'


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
    const [user, setUser] = React.useState('')

    const handleChange = (event) => {
        setUser(event.target.value)
        
      }

  return (
    <div>
      <h1>Kontakt</h1>
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                 Wybierz do kogo chcesz napisać wiadomość</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={user}
                    onChange={handleChange}
                    label="Wybierz do kogo chcesz napisać wiadomość"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Do kursanta</MenuItem>
                    <MenuItem value={20}>Do instruktora</MenuItem>
                    <MenuItem value={30}>Do wszystkich członków danej grupy</MenuItem>
                 </Select>
            </FormControl>

            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                 Wybierz nazwisko/grupę</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={user}
                    onChange={handleChange}
                    label="Wybierz nazwisko/grupę"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Grupa p1</MenuItem>
                    <MenuItem value={20}>Grupa z3</MenuItem>
                    <MenuItem value={30}>Grupa s1</MenuItem>
                </Select>
            </FormControl> 

            <TextField className={classes.text}
                label="Treść wiadomości" 
                variant="outlined" 
                multiline rows={8}
                required>
            </TextField>
            <Button className={classes.button} variant="contained" color="primary">
                Wyślij
            </Button>
        </form>
    </div>
  )
}

export default Contact