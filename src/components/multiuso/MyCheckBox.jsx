import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';

function MyCheckBox(props) {
  const { itemList, label, coresHEX, qtsCheckBoxPorColuna, name, setObj, obj } =
    props;

  let qtsCheckBoxPorCol = 12 / qtsCheckBoxPorColuna;

  const handleCheckboxChange = (event, value) => {
    if (obj[name].includes(value)) {
      let x = obj[name].filter((item) => item !== value);
      setObj((prevObj) => ({
        ...prevObj,
        [name]: x,
      }));
    } else {
      setObj((prevObj) => ({
        ...prevObj,
        [name]: [...prevObj[name], value],
      }));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <InputLabel>{label}</InputLabel>
      </Grid>
      {itemList.map((item, index) => (
        <Grid item xs={qtsCheckBoxPorCol} key={index}>
          <FormControlLabel
            control={
              <Checkbox
                checked={obj[name].includes(item)}
                name={name}
                onChange={(e) => {
                  handleCheckboxChange(e, item);
                }}
              />
            }
            label={
              coresHEX[index] !== undefined ? (
                <>
                  <div
                    style={{
                      display: 'inline',
                      backgroundColor: '#' + coresHEX[index],
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div
                    style={{
                      display: 'inline',
                    }}
                  >
                    &nbsp;
                  </div>
                  {item}
                </>
              ) : (
                <>{item}</>
              )
            }
          />
        </Grid>
      ))}
    </Grid>
  );
}

MyCheckBox.propTypes = {
  itemList: PropTypes.array.isRequired,
  obj: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  coresHEX: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  qtsCheckBoxPorColuna: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  setObj: PropTypes.func.isRequired,
};

export default MyCheckBox;
