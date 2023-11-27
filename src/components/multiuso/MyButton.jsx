import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function MyButton(props) {
  return (
    <Grid item xs={props.xs}>
      <Grid container justify='center' alignItems='center'>
        <Grid item xs={12}>
          <Button
            sx={{ p: 1, mt: 1, mb: 1 }}
            // m
            // mb -> embaixo
            // mt -> emcima
            variant='contained'
            onClick={props.onClick}
            fullWidth
          >
            {props.textoDoBotao}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

MyButton.propTypes = {
  xs: PropTypes.number.isRequired,
  textoDoBotao: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MyButton;
