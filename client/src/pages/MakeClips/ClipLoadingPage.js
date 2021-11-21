import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import axios from 'axios'
import MakeClip from './MakeClip'
import Button from '@material-ui/core/Button'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import SaveIcon from '@material-ui/icons/Save'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      '@media (max-width: 767px)': {
        width: '80%',
      },
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      '@media (max-width: 767px)': {
        width: '80%',
      },
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    '@media (max-width: 767px)': {
      width: '80%',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function ResponsiveDrawer(props) {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { uuid } = useParams()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const [videoDownloaded, setVideoDownloaded] = useState({
    uuid: '',
    name: '',
    createdAt: '',
    filepath: '',
    clips: [],
  })

  console.log(videoDownloaded)
  const drawer = (
    <div>
      <div className={classes.drawerContainer}>
        <ListItem style={{ marginBottom: '1em' }}>
          <Typography
            style={{
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: '30px',
              lineHeight: '24px',
              color: '#21294C',
            }}
            variant='h3'
          >
            All Clips
          </Typography>
        </ListItem>

        <List>
          {videoDownloaded.clips &&
            videoDownloaded.clips.map((obj, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  <IconButton
                    color='secondary'
                    aria-label='delete'
                    onClick={() => deleteClip(uuid, obj.uuid)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    color: 'black',
                  }}
                  primary={obj.name.substring(0, 10)}
                />
                <Button
                  variant='contained'
                  size='small'
                  style={{
                    background: '#115294',
                    color: 'white',
                    textDecoration: 'none',
                  }}
                  onClick={() => handleDownloadClip(uuid, obj.uuid)}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </ListItem>
            ))}
        </List>
      </div>
    </div>
  )

  const deleteClip = async (uuid, clipid) => {
    try {
      const res = await axios.delete(`/delete-clip/${uuid}/${clipid}`)
      setVideoDownloaded(res.data)
      if (res) {
        toast.error('Clip Removed')
      }
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }

  const handleDownloadClip = async (uuid, clipid) => {
    try {
      console.log({ uuid, clipid })
      if (!clipid && !uuid) {
        toast.error('clipid not there')
      } else {
        return await axios.get(`/download-clip/${uuid}/${clipid}`)
      }
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <ToastContainer />
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Video Clip Maker
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MakeClip
          videoDownloaded={videoDownloaded}
          setVideoDownloaded={setVideoDownloaded}
        />
      </main>
    </div>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default ResponsiveDrawer
