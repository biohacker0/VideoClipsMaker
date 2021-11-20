import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '70px',
    width: '100%',
  },
  addPlayerForm: {
    display: 'flex',
    backgroundColor: 'white',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      border: '0px solid white',
    },
    width: '100%',
    alignItems: 'center',
  },
  firstRow: {
    display: 'flex',
    padding: '20px',
    width: '100%',
    alignItems: 'center',
  },
  inputCustom: {
    // marginLeft: "36px",
    backgroundColor: 'white',
    borderRadius: '5px',
    fontWeight: 590,
    fontSize: '16px',
    // lineHeight: "7px",
    height: '40px',
  },
  dropdownLabel: {
    position: 'relative',
  },
  secondRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: '22px',
  },
  submitBgColor: {
    backgroundColor: 'white',
    border: '1px solid green',
    borderRadius: '25px',
    marginLeft: '1em',
    width: '100px',
    color: '#00A652',
    height: '40px',
    '&:hover': {
      background: 'green',
      color: 'white',
      border: 'none',
    },
  },
}))
