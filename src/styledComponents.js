import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

export const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      textAlign: 'left',
      padding: '12px 20px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 4
      }
    },
  }))(InputBase)
  

  