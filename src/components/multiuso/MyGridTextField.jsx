import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

function MyGridTextField(props) {
  return (
    <Grid item xs={props.xs}>
      <TextField
        {...props}
        InputLabelProps={
          props.type === 'date'
            ? {
                shrink: true,
              }
            : undefined
        }
        fullWidth
      />
    </Grid>
  );
}

MyGridTextField.propTypes = {
  xs: PropTypes.number.isRequired,
  sm: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default MyGridTextField;
