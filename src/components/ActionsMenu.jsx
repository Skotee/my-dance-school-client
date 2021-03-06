import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import GroupIcon from '@material-ui/icons/Group'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import axios from 'axios'
import { API_URL } from '../config/server.config'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

export default function ActionsMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

    async function handleDelete() {
    let groups = []
     await axios.get(`${API_URL}/groups`, { withCredentials: true }).then(dance => {
      groups = dance.data
    })   
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].students[0]._id == props.id._id) {
        axios.delete(`${API_URL}/groups/` + groups[i]._id, { withCredentials: true })
      }
    }
    await axios.delete(`${API_URL}/users/` + props.id._id, { withCredentials: true })
    window.location.reload()
    return false
  } 

  return (
    <div style={{ textAlign: 'center'}}>
      <Button style={{ width: '100%'}}
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
       <MoreVertIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edytuj dane" />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Usu??" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Zarz??dzaj grupami" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <CreditCardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Przydziel karnet" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}