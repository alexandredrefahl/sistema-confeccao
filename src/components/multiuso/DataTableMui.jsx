// import { Box, CircularProgress } from '@mui/material/Box';
import { CircularProgress, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { myurl } from '../requestStuff/myurl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function DataTableMui(props) {
  const spinnerStyle = {
    animationDuration: '0.6s',
  };

  const btnIncluir = () => {
    props.setOqueMostrar('form');
    props.setObj(props.objReseter);
  };

  const rowReader = () => {
    if (oQueClicou != 0) {
      try {
        setLoading(true);
        fetch(myurl + 'rowReader', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: oQueClicou,
            tabela: props.tableReaderArgs['tabela'],
            column_name: props.tableReaderArgs['ordenar'],
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const inputObject = result.dados[0];
            const processedObject = {};

            for (const key in inputObject) {
              if (Object.prototype.hasOwnProperty.call(inputObject, key)) {
                const value = inputObject[key];
                processedObject[key] = value !== null ? value : '';
              }
            }
            props.setObj(processedObject);
            props.setOqueMostrar('form');

            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      } catch (e) {
        setLoading(false);
      }
    } else {
      alert('Escolha uma linha');
    }
  };

  const columns = props.columns;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [oQueClicou, setOQueClicou] = useState(0);

  const handleRowClick = (params) => {
    setOQueClicou(params.row.id);
  };

  const [filterText, setFilterText] = useState('');

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  useEffect(() => {
    fetch(myurl + 'tableReader', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.tableReaderArgs),
    })
      .then((response) => response.json())
      .then((data) => {
        setRows(data.dados);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao recuperar dados:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {loading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='50vh'
        >
          <CircularProgress
            style={spinnerStyle}
            size={80}
            thickness={4}
            color='primary'
          />
        </Box>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <Grid item xs={12} sx={{ p: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  sx={{ p: 1 }}
                  variant='contained'
                  onClick={() => btnIncluir()}
                >
                  <AddCircleOutlineIcon /> Novo
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  sx={{ p: 1 }}
                  variant='contained'
                  onClick={() => {
                    rowReader();
                  }}
                >
                  <EditIcon /> Alterar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ m: 1 }} />
          <TextField
            label=''
            variant='outlined'
            fullWidth
            value={filterText}
            sx={{ p: 1 }}
            onChange={(e) => setFilterText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Divider sx={{ m: 1 }} />
          <DataGrid
            sx={{ m: 1 }}
            rows={filterText === '' ? rows : filteredRows}
            columns={columns}
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </div>
      )}
    </Box>
  );
}

DataTableMui.propTypes = {
  columns: PropTypes.array.isRequired,
  setOqueMostrar: PropTypes.func.isRequired,
  setObj: PropTypes.func.isRequired,
  tableReaderArgs: PropTypes.object.isRequired,
  objReseter: PropTypes.object.isRequired,
};

export default DataTableMui;
