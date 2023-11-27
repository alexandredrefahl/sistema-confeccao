import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

function MySelect(props) {
  const { itemList, itemData, label, name, value, onChange } = props;
  // ItemList - Texto a ser apresentado
  // ItemData - Id ou valor do item
  return (
    <div>
      <FormControl className='MyGridTextField2' variant='outlined' fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select onChange={onChange} label={label} name={name} value={value}>
          {itemList.map((item, index) => (
            <MenuItem key={index} value={itemData[index]}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

MySelect.propTypes = {
  itemList: PropTypes.array.isRequired,
  itemData: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default MySelect;
