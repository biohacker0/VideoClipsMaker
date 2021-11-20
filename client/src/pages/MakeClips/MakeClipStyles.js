import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '4%',
    height: '100%',
    width: '95%',
    margin: 'auto',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  drawer: {
    width: '20%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '20%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rightGridBtn: {
    width: '85%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100px',
  },
  scaleCard: {
    height: '20vw',
    '@media (max-width: 767px)': {
      height: '100vw ',
    },
  },
  toogleDiv: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    width: '90%',
    margin: 'auto',
    marginTop: '2%',
    height: '50px',
    '@media (max-width: 767px)': {
      gridTemplateColumns: '1fr ',
    },
  },
  imgStyle: {
    width: '100%',
  },
  scaleimgDiv: {
    width: '90%',
    margin: 'auto',
    marginTop: '1.7%',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleButtons: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50px',
    alignContent: 'center',
    alignItems: 'center',
    '@media (max-width: 767px)': {
      width: '100%',
    },
  },
  scaleBTN: {
    width: '40%',
    height: '45px',
  },
  addClipBtnContainer: {
    width: '100%',
    display: 'flex',
    margin: ' auto',
    height: '50px',
    marginTop: '5em',
    justifyContent: 'space-between',
  },
  addClipBtn: {
    textTransform: 'none',
    color: 'grey',
    margin: 'auto',
    borderRadius: '0',
    width: '40%',
    background: '#D9DFEA',
    height: '90%',
  },
}))
