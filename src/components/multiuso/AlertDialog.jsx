import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={true}
        // onClose={}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle style={{ textAlign: 'center' }}>
          {props.qualMsg}
        </DialogTitle>
        <DialogContent sx={{ m: 1 }} style={{ textAlign: 'center' }}>
          {props.qualMsg2}
        </DialogContent>
        <DialogContent sx={{ m: 1 }} style={{ textAlign: 'center' }}>
          <Button
            onClick={() => {
              props.setAlerta(false);
            }}
          >
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
  // return props.alerta === true ? (
  //   <>
  //     <Dialog
  //       onClose={() => props.setAlerta(false)}
  //       aria-labelledby='alert-dialog-title'
  //       aria-describedby='alert-dialog-description'
  //     >
  //       <DialogTitle id='alert-dialog-title'>{'CEP Incorreto'}</DialogTitle>
  //       <DialogContent>
  //         <DialogContentText id='alert-dialog-description'>
  //           CEP Incorreto
  //         </DialogContentText>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => props.setAlerta(false)} autoFocus>
  //           Fechar
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   </>
  // ) : null;
}
AlertDialog.propTypes = {
  setAlerta: PropTypes.func.isRequired,
  qualMsg: PropTypes.string.isRequired,
  qualMsg2: PropTypes.string,
  //   alerta: PropTypes.bool.isRequired,
};
export default AlertDialog;
