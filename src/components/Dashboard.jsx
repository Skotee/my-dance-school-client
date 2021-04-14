import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import GroupIcon from '@material-ui/icons/Group'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink, 
} from 'react-router-dom'
import Link from '@material-ui/core/Link'

import Students from './Students.jsx'
import Groups from './Groups.jsx'
import Contact from './Contact.jsx'

const drawerWidth = 300

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#282c34'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    link: {
      color: 'yellow',
    },
    listItemIcon: {
      color: 'yellow'
    }
  }),
)

export default function Dashboard({children}) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Moja szkoła tańca
            </Typography>
            {children}
          </Toolbar>
        </AppBar>
        
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose} className={classes.listItemIcon} >
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button >
              <ListItemIcon className={classes.listItemIcon}> 
                <EmojiPeopleIcon /> 
              </ListItemIcon>
              <ListItemText>
                <Link 
                  className={classes.link} 
                  component={RouterLink} 
                  to="/students"
                  >
                    Kursanci
                  </Link>
              </ListItemText>
            </ListItem>
            <ListItem button >
              <ListItemIcon className={classes.listItemIcon}> 
                <GroupIcon /> 
              </ListItemIcon>
              <ListItemText>
                <Link 
                  className={classes.link} 
                  component={RouterLink} 
                  to="/groups">
                    Grupy
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem button >
              <ListItemIcon className={classes.listItemIcon}> 
                <GroupIcon /> 
              </ListItemIcon>
              <ListItemText>
                <Link 
                  className={classes.link} 
                  component={RouterLink} 
                  to="/contact">
                    Formularz kontaktowy
                </Link>
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Typography paragraph>
            <Switch>
            <Route path="/students">
              <Students />
            </Route>
            <Route path="/groups">
              <Groups />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
          </Typography>
        </main>
      </Router>
    </div>
  )
}
