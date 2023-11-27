import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MenuLateral(props) {
  const { displayName, arr } = props.obj;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography>{displayName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {arr.map((item, index) => (
          <Link key={index} to={item.qualRota}>
            <ListItem disablePadding>
              <ListItemButton>
                {item.icon}
                {item.displayName}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

MenuLateral.propTypes = {
  obj: PropTypes.object.isRequired,
};

export default MenuLateral;
